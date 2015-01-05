var express = require('express');
var engines = require('consolidate');
var request = require('request');
var im = require('imagemagick-stream');
var app = express();

var port = process.env.PORT || 4000;

app.engine('svg', engines.swig);

app.get('/v2/:username/button.svg', function(req, res) {
    res.set('Content-Type', 'image/svg+xml');
    res.render('button.svg', req.params);
});

app.get('/v2/:username/:widget.svg', function(req, res) {
    request.get(
        {
            json: true,
            url: 'https://gratipay.com/' + req.params.username + '/public.json'
        },

        function(error, response, data) {
            if (error) {
                return res.status(500).send();
            } else if (response.statusCode !== 200) {
                return res.status(404).send();
            }

            res.set('Content-Type', 'image/svg+xml');
            res.render(req.params.type + '.svg', data);
        }
    );
});

app.get('/v2/:username/:widget.png', function(req, res) {
    request
        .get(
            'http://localhost:' + port + '/v2/' +
            req.params.username + '/' + req.params.widget + '.svg'
        )
        .pipe(im().inputFormat('svg').outputFormat('png'))
        .pipe(res);
});

app.listen(port);
