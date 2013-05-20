(function(Gittip, $) {
	var username, gttp, w,
	    api = window.gttpAPI || '//gttp.co/v1/';

	if (Gittip.widgets) {
		for (var i=0, els=$('[data-gittip-username]'); i<els.length; i++) {
			if (!els[i].getAttribute('data-gittip-readystatus'))
				Gittip.widgets.load(els[i]);
		}
	} else if (!$('script[src="' + api + 'api.js"]').length) {
		gttp = document.createElement('script');
		gttp.src = api + 'api.js';
		$('head')[0].appendChild(gttp);
	}
})(window.Gittip || {}, function($) { return document.querySelectorAll($); });
