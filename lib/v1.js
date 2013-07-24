/**
 * Gittip widget main initialization.
 *
 * Initializes widgets and pulls in the Widgets API if it isn't already loaded
 */
(function(Gittip, $) {
	'use strict';

	var gttp, i,

	    // Slurp up widgets (identified by having the `data-gittip-username` property)
	    elements = $('[data-gittip-username]'),

	    // Cache length
	    length = elements.length,

	    // Where's our files?
	    api = window.gttpAPI || '//gttp.co/v1/';

	window._gttp = window._gttp || [];

	// Load widget API if it hasn't been
	if (!Gittip.widgets && !$('script[src="' + api + 'api.js"]').length) {
		gttp = document.createElement('script');
		gttp.src = api + 'api.js';
		$('head')[0].appendChild(gttp);
	}

	// Load widgets
	for (i=0; i<length; i++) {
		// Ignore widgets with the `data-gittip-readystatus` property
		if (!elements[i].getAttribute('data-gittip-readystatus')) {
			if (Gittip.widgets)
				Gittip.widgets.load(elements[i]);
			else
				_gttp.push(elements[i]);

			elements[i].setAttribute('data-gittip-readystatus', 'loading');
		}
	}
})(
	// Pass window.Gittip if available
	window.Gittip || {},

	// Short wrapper around document.querySelectorAll()
	function($) {
		'use strict';

		return document.querySelectorAll($);
	}
);
