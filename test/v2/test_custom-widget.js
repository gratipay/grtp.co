module.exports = {

    'v2 custom-widget: readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/v2/custom-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gratipay-teamslug]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'v2 custom-widget: it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/v2/custom-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.text('.gratipay-teamslug').is.not('', 'username should not be empty')
            .assert.text('.gratipay-receiving').is.not('', 'taking should not be empty')
            .done();
    },

};
