module.exports = {

    'readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/default-widget-anonymous.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gittip-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gittip-username]', 'data-gittip-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'it should show anonymous receiving': function(test) {
        test.open('http://localhost:9537/test/default-widget-anonymous.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gittip-readystatus="ready"]');
            }, [], 2000)
            .assert.exists('iframe')
            .toFrame('iframe')
                .assert.exists('.gittip-receiving')
                .assert.text('.gittip-receiving').is('anonymously', 'receiving should not be empty')
            .toParent()
            .done();
    },

};
