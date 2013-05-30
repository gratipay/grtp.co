# gttp.co [![Testing](https://secure.travis-ci.org/gittip/gttp.co.png)](http://travis-ci.org/gittip/gttp.co)

Gittip widgets + widget API

## Getting Started

```
$ git clone git@github.com:gittip/gttp.co.git
$ cd gttp.co
$ npm install
$ node start.js
```

Then visit http://localhost:1234/


## Documentation
_(Coming soon)_

## Examples
In the following examples, just switch out `rummik` with your Gittip username.

### Standard Widgets
```html
<script src="//gttp.co/v1.js" data-gittip-username="rummik"></script>
```

```html
<script src="//gttp.co/v1.js" data-gittip-username="rummik" data-gittip-widget="button"></script>
```

### Custom Widgets
You can create your own widgets by adding `data-gittip-widget="custom"` to your
widget's HTML, and the following classes:

- Text
	- `gittip-receiving` - dollar-sign prefixed value of `receiving`
	- `gittip-username` - the user's username
	- `gittip-goal` - dollar-sign prefixed value of `goal`
	- `gittip-giving` - dollar-sign prefixed value of `giving`
- Links
	- `gittip-profile-link` - sets the `href` attribute to the user's profile link
	- `gittip-link` - sets the `href` attribute to https://www.gittip.com/
- Misc styling
	- `gittip-goal-progress-bar` - sets the element's width to a percentage value of the user's goal progress


```html
<div data-gittip-username="rummik" data-gittip-widget="custom">
	I receive <a class="gittip-profile-link"><div class="gittip-receiving">$0.00</div> / wk</a> on <a class="gittip-link">Gittip</a>.
</div>
<script src="//gttp.co/v1.js"></script>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [grunt](https://github.com/gruntjs/grunt).

## Release History
_(Nothing yet)_

## License
Released into the public domain (per CC0).
