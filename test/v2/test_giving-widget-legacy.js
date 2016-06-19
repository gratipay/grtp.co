module.exports = {

    'giving-widget-legacy: readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/v2/giving-widget-legacy.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gittip-username]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'giving-widget-legacy: it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/v2/giving-widget-legacy.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.exists('iframe')
            .toFrame('iframe')
                .assert.exists('.gratipay-identity')
                .assert.text('.gratipay-identity').is.not('', 'identity should not be empty')
                .assert.exists('.gratipay-giving')
                .assert.text('.gratipay-giving').is.not('', 'giving should not be empty')
            .toParent()
            .done();
    },

};
