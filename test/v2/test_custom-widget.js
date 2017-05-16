module.exports = {

    'v2 custom-widget: readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/v2/custom-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gratipay-projectslug]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'v2 custom-widget: it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/v2/custom-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.text('.gratipay-projectslug').is.not('', 'projectslug should not be empty')
            .assert.text('.gratipay-receiving').is.not('', 'receiving should not be empty')
            .done();
    },

};
