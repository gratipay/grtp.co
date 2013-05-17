(function(_) {
	window.Gittip = window.Gittip || {};

	Gittip.users = {
		getPublic: function(name, cb) {
			_.json('https://www.gittip.com/' + encodeURIComponent(name) + '/public.json', cb);
		}
	};

	Gittip.widgets = {
		_: _,

		load: function(name, element) {
			Gittip.users.getPublic(name, function(user) {
				_.json('/lib/v1/widgets/example.json', function(data) {
					var container = _.jsonml(['iframe', { style: 'border:0;margin:0;padding:0' }]),
					    widget    = _.jsonml(['div', _.jsoncss([['body', { margin: 0, padding: 0 }], ['body > div', { float: 'left' }]].concat(data.style))].concat(data.widget)),
					    link      = function(className, value) {
						    apply(className, '_top', 'target');
						    apply(className, value, 'href');
					    },
					    apply     = function(className, value, prop) {
						    prop = prop || 'innerHTML';
						    _.each(widget.getElementsByClassName('gittip-' + className), function(el) {
							    el[prop] = value;
						    });
					    };

					apply('receiving', '$' + user.receiving);
					link('profile-link', 'https://www.gittip.com/' + encodeURIComponent(user.username));
					link('link', 'https://www.gittip.com/');

					element.parentNode.insertBefore(container, element);
					container.contentDocument.body.appendChild(widget);

					(function ready() {
						if (!container.contentDocument.body.firstChild)
							return setTimeout(ready, 0);

						container.style.width = widget.clientWidth + 'px';
						container.style.height = widget.clientHeight + 'px';
					})();
				});
			});
		},

		init: function() {
			_.each(window._gittip || [], function(widget) {
				var w = Gittip.widgets.load(widget[0], widget[1]);
				widget[1].parentNode.insertBefore(w, widget[1]);
			});
		}
	};

	Gittip.widgets.init();
})({
	each: function(a, fn) {
		for (var i=0; i<a.length; i++)
			fn(a[i], i, length);
	},

	jsoncss: function(jsoncss) {
		var out = '';

		this.each(jsoncss, function(selector) {
			if (typeof selector == 'string')
				return out += selector + ';';

			out += selector[0] + '{';

			for (var prop in selector[1])
				out += prop + ':' + selector[1][prop] + ';';

			out += '}';
		});

		return this.jsonml(['style', out]);
	},

	jsonml: function(jsonml) {
		var node  = document.createElement(jsonml[0]),
		    _     = this;

		_.each(jsonml, function(v, j) {
			if (j === 0 || typeof v === 'undefined') return;

			switch (v.constructor) {
				case Object:
					for (var p in v)
						node.setAttribute(p, v[p]);
					break;

				case Array: node.appendChild(_.jsonml(v)); break;

				case String: case Number:
					node.appendChild(document.createTextNode(v));
					break;

				default: node.appendChild(v); break;
			}
		});

		return node;
	},

	jsonp: function(url, cb) {
		var _cb = '_req' + Math.floor(Math.random() * 1000);
		window[_cb] = cb;
		document.head.appendChild(this.jsonml(['script', { src: url + '?callback=' + _cb }]));
	},

	_xhr: function(cb) {
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) cb();
		};

		return xhr;
	},

	json: function(url, cb) {
		var xhr = this._xhr(function() {
			cb(JSON.parse(xhr.responseText));
		});

		xhr.open('GET', url);
		xhr.send();
	}

});
