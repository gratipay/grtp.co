module.exports = {

    'readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/custom-widget-legacy.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gittip-username]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/custom-widget-legacy.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.text('.gittip-username').is.not('', 'username should not be empty')
            .assert.text('.gittip-identity').is.not('', 'identity should not be empty')
            .assert.text('.gittip-giving').is.not('', 'giving should not be empty')
            .assert.text('.gittip-receiving').is.not('', 'receiving should not be empty')
            .done();
    },

};
