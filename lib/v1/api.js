(function(_) {
	var api       = window.gttpAPI   || '//gttp.co/v1/',
	    gittipURI = window.gittipURI || 'https://www.gittip.com/';

	window.Gittip = window.Gittip || {};

	Gittip.users = {
		getPublic: function(name, cb) {
			_.jsonp(gittipURI + encodeURIComponent(name) + '/public.json', cb);
		}
	};

	Gittip.widgets = {
		_: _,

		apply: function(element, cb) {
			var username = element.getAttribute('data-gittip-username'),
			    css      = function(className, value) { set(className, 'style', ';' + value, true, true); },
			    text     = function(className, value) { set(className, 'innerHTML', value); },
			    link     = function(className, value) {
				    set(className, 'target', '_top', true);
				    set(className, 'href', value, true);
			    },
			    set      = function(className, property, value, attribute, append) {
				    _.each(element.getElementsByClassName('gittip-' + className), function(el) {
					    if (attribute)
						    el.setAttribute(property, (append ? ''+el.getAttribute(property) : '') + value);
					    else
						    el[property] = value;
				    });
			    };

			Gittip.users.getPublic(username, function(data) {
				element.setAttribute('data-gittip-readystatus', 'ready');
				text('receiving', '$' + data.receiving);
				text('username', data.username);
				text('my-tip-button', data.my_tip == 'self' ? 'You!' : (+data.my_tip > 0 ? data.my_tip : 'Gittip'));
				text('goal', '$' + data.goal);
				text('giving', '$' + (data.giving || '0.00'));
				link('profile-link', gittipURI + encodeURIComponent(data.username) + '/');
				link('link', gittipURI);
				css('goal-progress-bar', 'width:' + (data.receiving / data.goal * 100) + '%');

				if (typeof cb == 'function') cb(data);
			});
		},

		getWidget: function(widget, cb) {
			_.json(api + 'widgets/' + widget + '.json', function(data) {
				cb(_.jsonml(
					['div', _.jsoncss(data.style)].concat(data.widget)
				));
			});
		},

		load: function(element) {
			var widgetType = element.getAttribute('data-gittip-widget') || 'default',
			    username   = element.getAttribute('data-gittip-username');

			element.setAttribute('data-gittip-readystatus', 'loading');

			if (['false', 'none', 'user-defined', 'custom'].indexOf(widgetType.toLowerCase()) != -1)
				return Gittip.widgets.apply(element);

			Gittip.widgets.getWidget(widgetType, function(widget) {
				var container = _.jsonml(['iframe', { style: 'border:0;margin:0;padding:0;width:0;height:0' }]),
				    style     = _.jsoncss([
					    ['body', {
						    margin: 0,
						    padding: 0,
						    overflow: 'hidden'
					    }],
					    ['body > div', {
						    float: 'left'
					    }]
				    ]),

				    // resize the container <iframe> to fit the content
				    resize = function() {
					    container.style.width = widget.clientWidth + 'px';
					    container.style.height = widget.clientHeight + 'px';
				    },

				    // FireFox's <iframe> gives a false-positive contentDocument.body
				    // so we need to hook the onload event
				    onload = function() {
					    container.contentDocument.head.appendChild(style);
					    container.contentDocument.body.appendChild(widget);

					    resize();

					    Gittip.widgets.apply(widget, function() {
						    element.setAttribute('data-gittip-readystatus', 'ready');
						    resize();
					    });
				    };

				// IE 8 requres .attachEvent(), everybody else can use .onload
				if (container.attachEvent)
					container.attachEvent('onload', onload);
				else
					container.onload = onload;

				widget.setAttribute('data-gittip-username', username);
				element.parentNode.insertBefore(container, element);
			});
		},

		init: function() {
			_.each(document.querySelectorAll('[data-gittip-username]'), this.load);
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

			for (var i=1; i<selector.length; i++) {
				for (var prop in selector[i])
					out += prop + ':' + selector[i][prop] + ';';
			}

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
		window[_cb] = function(_) { cb(_); delete window[_cb]; };
		document.head.appendChild(this.jsonml(['script', { src: url + '?callback=' + _cb }]));
	},

	_xhr: function(cb) {
		var xhr = new XMLHttpRequest();

		if (xhr.withCredentials === undefined && XDomainRequest)
			return this._xdr(cb);

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) cb();
		};

		return xhr;
	},

	_xdr: function(cb) {
		var xdr = new XDomainRequest();
		xdr.onload = cb;
		return xdr;
	},

	json: function(url, cb) {
		var xhr = this._xhr(function() {
			cb(JSON.parse(xhr.responseText));
		});

		xhr.open('GET', url);
		xhr.send();
	}

});
