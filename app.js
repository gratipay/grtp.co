var express = require('express');
var engines = require('consolidate');
var request = require('request');
var async = require('async');
var im = require('imagemagick-stream');
var app = express();

var port = process.env.PORT || 4000;

app.engine('svg', engines.swig);

app.get('/v2/:username/button.svg', function(req, res) {
    res.set('Content-Type', 'image/svg+xml');
    res.render('button.svg', req.params);
});

function get(endpoint) {
    return function(callback) {
        request.get(
            {
                json: true,
                url: 'https://gratipay.com/' + endpoint
            },

            function(error, response, data) {
                if (error || response.statusCode !== 200) {
                    callback(error || response.statusCode);
                } else {
                    callback(null, data);
                }
            }
        );
    };
}

app.get('/v2/:username/:widget.svg', function(req, res) {
    async.parallel(
        {
            public: get(req.params.username + '/public.json'),
            charts: get(req.params.username + '/charts.json')
        },

        function(err, results) {
            if (err) {
                res.status(typeof err == 'number' ? 404 : 500).send();
                return;
            }

            var data = results.public;
            var maxReceived = 0;
            var maxPatrons = 0;

            data.charts = results.charts.filter(function(chart) {
                maxReceived = Math.max(chart.receipts, maxReceived);
                maxPatrons = Math.max(chart.patrons, maxPatrons);
                return !chart.ts_start; // jshint ignore:line
            });

            data.max_received = maxReceived; // jshint ignore:line
            data.max_patrons = maxPatrons; // jshint ignore:line

            res.set('Content-Type', 'image/svg+xml');
            res.render(req.params.widget + '.svg', data, function(err, result) {
                if (!err) {
                    res.send(result);
                } else {
                    res.set('Content-Type', '');
                    res.status(404).send();
                }
            });
        }
    );
});

app.get('/v2/:username/:widget.png', function(req, res) {
    res.set('Content-Type', 'image/png');

    request
        .get(
            'http://localhost:' + port + '/v2/' +
            req.params.username + '/' + req.params.widget + '.svg'
        )
        .pipe(im().inputFormat('svg').outputFormat('png'))
        .pipe(res);
});

app.listen(port);
