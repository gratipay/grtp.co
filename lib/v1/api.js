(function(_) {
	'use strict';

	var api       = window.gttpAPI   || '//gttp.co/v1/',
	    gittipURI = window.gittipURI || 'https://www.gittip.com/';

	window.Gittip = window.Gittip || {};

	Gittip.users = {
		/**
		 * Get a user's public.json
		 *
		 * @param {String} name User name
		 * @param {Function} cb(data) Callback with data from user's public.json
		 */
		getPublic: function(name, cb) {
			_.jsonp(gittipURI + encodeURIComponent(name) + '/public.json', cb);
		}
	};

	Gittip.widgets = {
		_: _,

		/**
		 * Apply public.json data to a widget
		 *
		 * @param {Element} element Widget element
		 * @param {Function} [cb(data)] Callback
		 */
		apply: function(element, cb) {
			var username = element.getAttribute('data-gittip-username');

			function set(className, property, value, attribute, append) {
				_.each(element.getElementsByClassName('gittip-' + className), function(element) {
					if (attribute)
						element.setAttribute(property, (append ? '' + element.getAttribute(property) : '') + value);
					else
						element[property] = value;
				});
			}

			function css(className, value) {
				set(className, 'style', ';' + value, true, true);
			}

			function text(className, value) {
				set(className, 'innerHTML', value);
			}

			function link(className, value) {
				set(className, 'target', '_top', true);
				set(className, 'href', value, true);
			}

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

				if (typeof cb == 'function')
					cb(data);
			});
		},

		/**
		 * Get the HTML for a widget
		 *
		 * @param {String} widget Widget name
		 * @param {Function} cb(widget) Callback with widget element
		 */
		getWidget: function(widget, cb) {
			_.json(api + 'widgets/' + widget + '.json', function(data) {
				cb(_.jsonml(
					['div', _.jsoncss(data.style)].concat(data.widget)
				));
			});
		},

		/**
		 * Load a widget using data from `element`
		 *
		 * @param {Element} element DOM Element
		 */
		load: function(element) {
			var widgetType = element.getAttribute('data-gittip-widget') || 'default',
			    username   = element.getAttribute('data-gittip-username');

			// Set a readystate on the element
			element.setAttribute('data-gittip-readystatus', 'loading');

			// Skip to applying widget data if this is a custom/user-defined widget
			if (['false', 'none', 'user-defined', 'custom'].indexOf(widgetType.toLowerCase()) != -1)
				return Gittip.widgets.apply(element);

			// Get the widget (defined by widgetType)
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
				    ]);

				// FireFox's <iframe> gives a false-positive contentDocument.body
				// so we need to hook the onload event
				function onload() {
					container.contentDocument.head.appendChild(style);
					container.contentDocument.body.appendChild(widget);

					// Resize the container <iframe> to fit the content
					(function resize() {
						container.style.width = widget.clientWidth + 'px';
						container.style.height = widget.clientHeight + 'px';

						setInterval(resize, 500);
					})();

					Gittip.widgets.apply(widget, function() {
						element.setAttribute('data-gittip-readystatus', 'ready');
					});
				}

				// IE 8 requres .attachEvent(), everybody else can use .onload
				if (container.attachEvent)
					container.attachEvent('onload', onload);
				else
					container.onload = onload;

				widget.setAttribute('data-gittip-username', username);
				element.parentNode.insertBefore(container, element);
			});
		},

		/**
		 * Widget initialization
		 */
		init: function() {
			_.each(document.querySelectorAll('[data-gittip-username]'), this.load);
		}
	};

	Gittip.widgets.init();
})({
	// Helpers

	/**
	 * Iterate over an array
	 *
	 * @param {Array} array Array to iterate over
	 * @param {Function} fn(item, index, length) Callback function
	 */
	each: function(array, fn) {
		'use strict';

		var i,
		    length = array.length;

		for (i=0; i<length; i++)
			fn(array[i], i, length);
	},

	/**
	 * JSONCSS parser
	 *
	 * @param {Array} jsoncss JSONCSS selector list
	 * @return {Element} `<style>` element
	 */
	jsoncss: function(jsoncss) {
		'use strict';

		var _   = this,
		    css = '';

		_.each(jsoncss, function(selector) {
			if (typeof selector == 'string')
				return css += selector;

			css += selector.shift() + '{';

			_.each(selector, function(properties) {
				for (var property in properties)
					css += property + ':' + properties[property] + ';';
			});

			css += '}';
		});

		return this.jsonml(['style', css]);
	},

	/**
	 * Simple JSONML parser
	 * See: http://www.jsonml.org/
	 *
	 * @param {Array} jsonml JSONML element
	 * @return {Element}
	 */
	jsonml: function(jsonml) {
		'use strict';

		var _    = this,
		    node = document.createElement(jsonml.shift());

		_.each(jsonml, function(token) {
			if (typeof token === 'undefined')
				return;

			switch (token.constructor) {
				// Attributes to be applied to our node
				case Object:
					for (var attribute in token)
						node.setAttribute(attribute, token[attribute]);
					break;

				// Child elements
				case Array:
					node.appendChild(_.jsonml(token));
					break;

				// Text nodes
				case String: case Number:
					node.appendChild(document.createTextNode(token));
					break;

				// Anything else should be considered a DOM Element
				default:
					node.appendChild(token);
					break;
			}
		});

		return node;
	},

	/**
	 * Quick and dirty JSONp
	 *
	 * @param {String} url URL of JSON file
	 * @param {Function} cb(json) Callback function
	 */
	jsonp: function(url, cb) {
		'use strict';

		var _cb = '_req' + Math.floor(Math.random() * 1000);
		window[_cb] = function(_) { cb(_); delete window[_cb]; };
		document.head.appendChild(this.jsonml(['script', { src: url + '?callback=' + _cb }]));
	},

	// Private XHR wrapper
	_xhr: function(cb) {
		'use strict';

		var xhr = new XMLHttpRequest();

		// Use XDomainRequest if CORS via XMLHttpRequest is unavailable
		if (xhr.withCredentials === undefined && XDomainRequest)
			return this._xdr(cb);

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) cb();
		};

		return xhr;
	},

	// Private XDR wrapper
	_xdr: function(cb) {
		'use strict';

		var xdr = new XDomainRequest();
		xdr.onload = cb;
		return xdr;
	},

	/**
	 * A little JSON
	 *
	 * @param {String} url URL of JSON file
	 * @param {Function} cb(json) Callback function
	 */
	json: function(url, cb) {
		'use strict';

		var xhr = this._xhr(function() {
			cb(JSON.parse(xhr.responseText));
		});

		xhr.open('GET', url);
		xhr.send();
	}

});
