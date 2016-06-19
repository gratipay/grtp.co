module.exports = {

    'default-widget-anonymous: readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/v2/default-widget-anonymous.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gratipay-username]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'default-widget-anonymous: it should show anonymous receiving': function(test) {
        test.open('http://localhost:9537/test/v2/default-widget-anonymous.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.exists('iframe')
            .toFrame('iframe')
                .assert.exists('.gratipay-receiving')
                .assert.text('.gratipay-receiving').is('anonymously', 'receiving should not be empty')
            .toParent()
            .done();
    },

};
