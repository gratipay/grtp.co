module.exports = {

    'v2 default-widget: readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/v2/default-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gratipay-username]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'v2 default-widget: it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/v2/default-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.exists('iframe')
            .toFrame('iframe')
                .assert.exists('.gratipay-identity')
                .assert.text('.gratipay-identity').is.not('', 'identity should not be empty')
                .assert.exists('.gratipay-taking')
                .assert.text('.gratipay-taking').is.not('', 'taking should not be empty')
            .toParent()
            .done();
    },

};
