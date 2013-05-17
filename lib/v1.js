(function(Gittip, $) {
	var i, username, gttp, w,
	    els = $('[data-gittip-username]');

	window._gittip = window._gittip || [];

	for (i=0; i<els.length; i++) {
		username = els[i].getAttribute('data-gittip-username');
		els[i].removeAttribute('data-gittip-username');

		if (Gittip && Gittip.widgets)
			Gittip.widgets.load(username, els[i]);
		else
			window._gittip.push([username, els[i]]);
	}

	if (!Gittip || !Gittip.widgets) {
		if (!$('script[src="//gttp.co/v1/api.js"]').length) {
			gttp = document.createElement('script');
			gttp.src = '//gttp.co/v1/api.js';
			$('head')[0].appendChild(gttp);
		}
	}
})(window.Gittip || {}, function($) { return document.querySelectorAll($); });
