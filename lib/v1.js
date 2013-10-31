/**
 * Gittip widget main initialization.
 *
 * Initializes widgets and pulls in the Widgets API if it isn't already loaded
 */
(function() {
    'use strict';

    // Short wrapper around document.querySelectorAll()
    function $(selector) {
        return document.querySelectorAll(selector);
    }

    // Slurp up widgets (identified by having the `data-gittip-username` property)
    var elements = $('[data-gittip-username]');

    // Cache length
    var length = elements.length;

    // Grab window.Gittip if available
    var Gittip = window.Gittip || {};

    // Where's our files?
    var api = window.gttpAPI || '//gttp.co/v1/';

    window._gttp = window._gttp || [];

    // Load widget API if it hasn't been
    if (!Gittip.widgets && !$('script[src="' + api + 'api.js"]').length) {
        var gttp = document.createElement('script');
        gttp.src = api + 'api.js';
        $('head')[0].appendChild(gttp);
    }

    // Load widgets
    for (var i=0; i<length; i++) {
        var element = elements[i];

        // Ignore widgets with the `data-gittip-readystatus` property
        if (!element.getAttribute('data-gittip-readystatus')) {
            if (Gittip.widgets)
                Gittip.widgets.load(element);
            else
                _gttp.push(element);

            element.setAttribute('data-gittip-readystatus', 'loading');
        }
    }
})();
