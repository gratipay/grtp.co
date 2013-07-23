/**
 * # Gittip widget main initialization.
 *
 * Initializes widgets and pulls in the Widgets API if it isn't already loaded
 */
(function(Gittip, $) {
	var username, gttp, i, elements, length,
	    api = window.gttpAPI || '//gttp.co/v1/';

	// Use the Gittip widget API if loaded, otherwise load it
	if (Gittip.widgets) {
		// Slurp up widgets (identified by having the `data-gittip-username` property)
		elements = $('[data-gittip-username]');

		// Cache length
		length = elements.length;

		// Load widgets
		for (i=0; i<length; i++) {
			// Ignore widgets with the `data-gittip-readystatus` property
			if (!elements[i].getAttribute('data-gittip-readystatus'))
				Gittip.widgets.load(elements[i]);
		}
	} else if (!$('script[src="' + api + 'api.js"]').length) {
		// Load Widget API
		gttp = document.createElement('script');
		gttp.src = api + 'api.js';
		$('head')[0].appendChild(gttp);
	}
})(
	// Pass window.Gittip if available
	window.Gittip || {},

	// Short wrapper around document.querySelectorAll()
	function($) {
		return document.querySelectorAll($);
	}
);
