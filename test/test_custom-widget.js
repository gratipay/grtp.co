module.exports = {

    'readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/custom-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gratipay-username]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'it should fill the standard values': function(test) {
        test.open('http://localhost:9537/test/custom-widget.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.text('.gratipay-username').is.not('', 'username should not be empty')
            .assert.text('.gratipay-identity').is.not('', 'identity should not be empty')
            .assert.text('.gratipay-giving').is.not('', 'giving should not be empty')
            .assert.text('.gratipay-taking').is.not('', 'taking should not be empty')
            .assert.text('.gratipay-goal').is.not('', 'goal should not be empty')
            .done();
    },

};
