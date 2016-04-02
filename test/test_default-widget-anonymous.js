module.exports = {

    'default-widget-anonymous: readystatus should be ready': function(test) {
        test.open('http://localhost:9537/test/default-widget-anonymous.html')
            .waitFor(function() {
                return !!document.querySelector('[data-gratipay-readystatus="ready"]');
            }, [], 2000)
            .assert.attr('[data-gratipay-username]', 'data-gratipay-readystatus').is('ready', 'readystatus should be ready')
            .done();
    }
	
};
