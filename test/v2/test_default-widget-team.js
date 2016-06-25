module.exports = {

    'v2 default-widget-team: readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/v2/default-widget-team.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gratipay-teamslug]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'v2 default-widget-team: it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/v2/default-widget-team.html')
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
