module.exports = {

    'readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/giving-widget-legacy.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gittip-username]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/giving-widget-legacy.html')
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
