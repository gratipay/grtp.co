/**
 * Gratipay widget main initialization.
 *
 * Initializes widgets and pulls in the Widgets API if it isn't already loaded
 */
(function() {
    'use strict';

    // Short wrapper around document.querySelectorAll()
    function $(selector) {
        return document.querySelectorAll(selector);
    }

    // Slurp up widgets (identified by having the `data-gratipay-username` property)
    var elements = $('[data-gratipay-projectslug]');

    // Cache length
    var length = elements.length;

    // Grab window.Gratipay if available
    var Gratipay = window.Gratipay || {};

    // Where's our files?
    var api = window.grtpAPI || 'https://grtp.co/v2/';

    window._grtp = window._grtp || [];

    // Load widget API if it hasn't been
    if (!Gratipay.widgets && !$('script[src="' + api + 'api.js"]').length) {
        var grtp = document.createElement('script');
        grtp.src = api + 'api.js';
        $('head')[0].appendChild(grtp);
    }

    // Load widgets
    for (var i=0; i<length; i++) {
        var element = elements[i];

        // Ignore widgets with the `data-gratipay-readystatus` property
        if (!element.getAttribute('data-gratipay-readystatus')) {
            if (Gratipay.widgets) {
                Gratipay.widgets.load(element);
            } else {
                _grtp.push(element);
            }

            element.setAttribute('data-gratipay-readystatus', 'loading');
        }
    }
})();
