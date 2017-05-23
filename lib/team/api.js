(function(_) {
    'use strict';

    var api = window.grtpAPI || 'https://grtp.co/v1/';
    var gratipayURI = window.gratipayURI || 'https://gratipay.com/';
    var _grtp = window._grtp || [];

    // Define window.Gratipay if it hasn't previously been defined
    if (!window.Gratipay) {
        // For legacy reasons, have window.Gittip also be defined
        window.Gittip =
        window.Gratipay = {};
    }

    Gratipay.teams = {
        /**
         * @private
         * Request data for a team from a team's json endpoint
         *
         * @param {String} [service] Service name
         * @param {String} team Team name
         * @param {String} endpoint JSON endpoint
         * @param {Function} callback(data) Callback with data from JSON endpoint
         */
        _get: function(service, team, endpoint, callback) {
            if (!callback) {
                callback = endpoint;
                endpoint = team;
                team = service;
                service = undefined;
            }

            var serviceURI = '';
            if (service) {
                serviceURI = 'on/' + service + '/';
            }

            // Use CORS XHR instead of JSONp if protocols match or we're being called from tests
            // Mostly so our mock Gratipay API works, but CORS is a bit cleaner regardless
            var mode = new RegExp('^(/|' + location.protocol + ')').test(gratipayURI) ? 'json' : 'jsonp';
            _[mode](gratipayURI + serviceURI + encodeURIComponent(team) + '/' + endpoint + '.json', callback);
        },

        // TODO: Add some sort of helper function so we aren't repeating the same
        //       6 lines of code with a single string changed for every endpoint.
        //       At the moment the duplicated code is just in are getPublic()
        //       and getCharts(), but it'll be required for every endpoint added.

        /**
         * Get a team's public.json
         *
         * @param {String} [service] Service name
         * @param {String} team Team name
         * @param {Function} callback(data) Callback with data from team's public.json
         */
        getPublic: function(service, team, callback) {
            if (!callback) {
                callback = team;
                team = service;
                service = undefined;
            }

            this._get(service, team, 'public', callback);
        },

        /**
         * Get a team's charts.json
         * @param {String} [service] Service name
         * @param {String} team Team name
         * @param {Function} callback(data) Callback with data from team's charts.json
         */
        getCharts: function(team, callback) {
            if (!callback) {
                callback = team;
                team = service;
                service = undefined;
            }

            this._get(team, 'charts', callback);
        }
    };

    Gratipay.widgets = {
        _: _,

        /**
         * Apply public.json data to a widget
         *
         * @param {Element} element Widget element
         * @param {Function} [cb(data)] Callback
         */
        apply: function(element, cb) {
            var teamname = element.getAttribute('data-gratipay-teamname');

            function set(className, property, value, attribute, append) {
                var elements = element.querySelectorAll('.gittip-' + className + ', .gratipay-' + className);
                _.each(elements, function(element) {
                    if (attribute) {
                        element.setAttribute(property, (append ? '' + element.getAttribute(property) : '') + value);
                    } else {
                        element[property] = value;
                    }
                });
            }

            function css(className, value) {
                set(className, 'style', ';' + value, true, true);
            }

            function text(className, value) {
                set(className, 'innerHTML', value);
            }

            function link(className, value) {
                if (!element.hasAttribute('target')) {
                    set(className, 'target', '_top', true);
                }

                set(className, 'href', value, true);
            }

            // Set up links and teamname before requesting public.json
            link('profile-link', gratipayURI + encodeURIComponent(teamname) + '/');
            link('link', gratipayURI);
            text('teamname', teamname);
            text('identity', 'We');

            Gratipay.teams.getPublic(teamname, function(data) {
                element.setAttribute('data-gratipay-readystatus', 'ready');
                text('receiving', (data.receiving)? '$' + data.receiving : 'anonymously');
                text('teamname', data.slug);
                text('my-tip-button', data.my_tip == 'self' ? 'You!' : (+data.my_tip > 0 ? data.my_tip : 'Gratipay')); // jshint ignore:line
                text('goal', '$' + data.goal);
                text('giving', (data.giving)? '$' + data.giving : 'anonymously');
                link('profile-link', gratipayURI + encodeURIComponent(data.slug) + '/');
                link('link', gratipayURI);
                css('goal-progress-bar', 'width:' + (data.receiving / data.goal * 100) + '%');

                if (data.slug) {
                    text('identity', 'We');
                }

                if (typeof cb == 'function') {
                    cb(data);
                }
            });
        },

        /**
         * Get the HTML for a widget
         *
         * @param {String} widget Widget name
         * @param {Function} cb(widget) Callback with widget element
         */
        getWidget: function(widget, cb) {
            _.get(api + 'widgets/' + widget + '.html', function(data) {
                // Fix for automatic scheme detection within injected <iframe>
                // elements -- where many browsers will interpret url(//grtp.co)
                // as url(about://grtp.co)
                data = data.replace(/url\((['"])?\/\//g, 'url($1' + location.protocol + '//');

                var widget = document.createElement('div');
                widget.innerHTML = data;
                cb(widget);
            });
        },

        /**
         * Load a widget using data from `element`
         *
         * @param {Element} element DOM Element
         */
        load: function(element) {
            var widgetType = element.getAttribute('data-gratipay-widget') || 'default';
            var teamname = element.getAttribute('data-gratipay-teamname');

            // Set a readystate on the element
            element.setAttribute('data-gratipay-readystatus', 'loading');

            // Skip to applying widget data if this is a custom/team-defined widget
            if (['false', 'none', 'team-defined', 'custom'].indexOf(widgetType.toLowerCase()) != -1) {
                return Gratipay.widgets.apply(element);
            }

            // Get the widget (defined by widgetType)
            Gratipay.widgets.getWidget(widgetType, function(widget) {
                var container = _.jsonml(['iframe', {
                    style: 'border:0;margin:0;padding:0;width:0;height:0'
                }]);

                var style = _.jsoncss([
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

                    // Expose Gratipay to widgets within iframe
                    container.contentWindow.Gratipay = {
                        teams: Gratipay.teams
                    };

                    // Resize the container <iframe> to fit the content
                    (function resize() {
                        container.style.width = widget.clientWidth + 'px';
                        container.style.height = widget.clientHeight + 'px';

                        setTimeout(resize, 500);
                    })();

                    Gratipay.widgets.apply(widget, function() {
                        element.setAttribute('data-gratipay-readystatus', 'ready');
                    });
                }

                // IE 8 requres .attachEvent(), everybody else can use .onload
                if (container.attachEvent) {
                    container.attachEvent('onload', onload);
                } else {
                    container.onload = onload;
                }

                widget.setAttribute('data-gratipay-teamname', slug);
                element.parentNode.insertBefore(container, element);
            });
        },

        /**
         * Widget initialization
         */
        init: function() {
            _.each(_grtp, this.load);
        }
    };

    Gratipay.widgets.init();
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

        var length = array.length;
        for (var i=0; i<length; i++) {
            fn(array[i], i, length);
        }
    },

    /**
     * JSONCSS parser
     *
     * @param {Array} jsoncss JSONCSS selector list
     * @return {Element} `<style>` element
     */
    jsoncss: function(jsoncss) {
        'use strict';

        var _ = this;
        var css = '';

        _.each(jsoncss, function(selector) {
            if (typeof selector == 'string') {
                return css += selector;
            }

            css += selector.shift() + '{';

            _.each(selector, function(properties) {
                var value, property;
                for (property in properties) {
                    // Fix for automatic scheme detection within injected <iframe>
                    // elements -- where many browsers will interpret url(//grtp.co)
                    // as url(about://grtp.co)
                    value = properties[property]
                            .toString()
                            .replace(/url\((['"])?\/\//g, 'url($1' + location.protocol + '//');

                    css += property + ':' + value + ';';
                }
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

        var _ = this;
        var node = document.createElement(jsonml.shift());

        _.each(jsonml, function(token) {
            if (typeof token === 'undefined') {
                return;
            }

            switch (token.constructor) {
                // Attributes to be applied to our node
                case Object:
                    for (var attribute in token) {
                        node.setAttribute(attribute, token[attribute]);
                    }
                    break;

                // Child elements
                case Array:
                    node.appendChild(_.jsonml(token));
                    break;

                // Text nodes
                case String:
                case Number:
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
        if (xhr.withCredentials === undefined && XDomainRequest) {
            return this._xdr(cb);
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cb();
            }
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
     * XHR wrapper
     *
     * @param {String} url URL of document to request
     * @param {Function} cb(data) Callback function
     */
    get: function(url, cb) {
        'use strict';

        var xhr = this._xhr(function() {
            cb(xhr.responseText);
        });

        xhr.open('GET', url);
        xhr.send();
    },

    /**
     * A little JSON
     *
     * @param {String} url URL of JSON file
     * @param {Function} cb(json) Callback function
     */
    json: function(url, cb) {
        'use strict';

        this.get(url, function(data) {
            cb(JSON.parse(data));
        });
    }

});
