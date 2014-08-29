module.exports = {

    'readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/giving-widget-anonymous.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gittip-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gittip-username]', 'data-gittip-readystatus').is('ready', 'readystatus should be ready')
            .done();
    },

    'it should show anonymous giving': function(test) {
        test.open('http://localhost:9537/test/giving-widget-anonymous.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gittip-readystatus="ready"]');
            }, [], 2000)
            .assert.exists('iframe')
            .toFrame('iframe')
                .assert.exists('.gittip-giving')
                .assert.text('.gittip-giving').is('anonymously', 'giving should not be empty')
            .toParent()
            .done();
    },

};
