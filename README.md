gttp.co [![Builds][]][Travis] [![Deps][]][Gemnasium]
=======

Gittip widgets + widget API

[Builds]: http://img.shields.io/Travis-ci/gittip/gttp.co.png "Build Status"
[Travis]: https://travis-ci.org/gittip/gttp.co
[Deps]: https://Gemnasium.com/gittip/gttp.co.png "Dependency Status"
[Gemnasium]: https://gemnasium.com/gittip/gttp.co

## Getting Started
Quickstart:
```
$ git clone git@github.com:gittip/gttp.co.git
$ cd gttp.co
$ make run
```

Then visit http://localhost:9537/test/


## Documentation
JSDoc comments are used, but documentation generation is not setup yet. The
code is documented, please dive in.

Configuration options:
- `window.gttpAPI` - Where to look for the gttp.co API
  - defaults to `//gttp.co/v1/`
- `window.gittipURI` - Where to look for Gittip
  - defaults to `https://www.gittip.com/`

## Examples
In the following examples, just switch out `rummik` with your Gittip username.

### Standard Widgets
![](http://9k1.us/R4YV/receiving.png)
```html
<script data-gittip-username="rummik"
  src="//gttp.co/v1.js" async></script>
```

![](http://9k1.us/SUNk/button.png)
```html
<script data-gittip-username="rummik"
  data-gittip-widget="button"
  src="//gttp.co/v1.js" async></script>
```

![](http://9k1.us/ySv6/giving.png)
```html
<script data-gittip-username="rummik"
  data-gittip-widget="giving"
  src="//gttp.co/v1.js" async></script>
```

### Custom Widgets
You can create your own widgets by adding `data-gittip-widget="custom"` to your
widget's HTML, and the following classes:

- Text
  - `gittip-receiving` - dollar-sign prefixed value of `receiving`
  - `gittip-username` - the user's username
  - `gittip-goal` - dollar-sign prefixed value of `goal`
  - `gittip-giving` - dollar-sign prefixed value of `giving`
  - `gittip-identity` - `I` if `number` is `singular`, `We` if `number` is
    `plural`
- Links
  - `gittip-profile-link` - sets the `href` attribute to the user's profile
    link
  - `gittip-link` - sets the `href` attribute to https://www.gittip.com/
- Misc styling
  - `gittip-goal-progress-bar` - sets the element's width to a percentage value
    of the user's goal progress


```html
<div data-gittip-username="rummik" data-gittip-widget="custom">
  I receive <a class="gittip-profile-link">
    <span class="gittip-receiving">$0.00</span> / wk
  </a>
  on <a class="gittip-link">Gittip</a>.
</div>
<script src="//gttp.co/v1.js"></script>
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [grunt](https://github.com/gruntjs/grunt).

To help keep a consistent style, we also recommend using
[EditorConfig](http://editorconfig.org).


## License
Released into the public domain (per CC0).
