module.exports = {

    'v1 default-widget: readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/v1/default-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gratipay-username]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'v1 default-widget: it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/v1/default-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.exists('iframe')
            .toFrame('iframe')
                .assert.exists('.gratipay-identity')
                .assert.text('.gratipay-identity').is.not('', 'identity should not be empty')
                .assert.exists('.gratipay-receiving')
                .assert.text('.gratipay-receiving').is.not('', 'receiving should not be empty')
            .toParent()
            .done();
    },

};
