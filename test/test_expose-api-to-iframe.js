module.exports = {

    'expose-api-to-iframe: widget should have Gratipay defined': function(test) {
        test.open('http://localhost:9537/test/expose-api-to-iframe.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .toFrame('iframe')
                .execute(function() {
                    this.assert.ok(typeof window.Gratipay != 'undefined', 'window.Gratipay should not be undefined');
                })
            .done();
    },

};
