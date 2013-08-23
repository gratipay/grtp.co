# gttp.co [![Testing](https://secure.travis-ci.org/gittip/gttp.co.png)](http://travis-ci.org/gittip/gttp.co)

Gittip widgets + widget API

## Getting Started
Quickstart:
```
$ git clone git@github.com:gittip/gttp.co.git
$ cd gttp.co
$ npm install --dev
$ npm install -g grunt-cli
$ grunt
$ node start.js
```

Then visit http://localhost:1234/


## Documentation
_(Coming soon)_

Configuration options:
- gttpAPI - Where to look for the gttp.co API
  - defaults to `//gttp.co/v1/`
- gittipURI - Where to look for Gittip
  - defaults to `https://www.gittip.com/`

## Examples
In the following examples, just switch out `rummik` with your Gittip username.

### Standard Widgets
```html
<script data-gittip-username="rummik"
  src="//gttp.co/v1.js"></script>
```

```html
<script data-gittip-username="rummik"
  data-gittip-widget="button"
  src="//gttp.co/v1.js"></script>
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

### Vim users
We recommend using [this Vim script](https://code.google.com/p/lh-vim/source/browse/misc/trunk/plugin/local_vimrc.vim)
which loads `.vimrc_local.vim` files, as well as adding the following lines to
your `~/.vimrc`:

```vim
" Use .vimrc_local.vim instead of _vimrc_local.vim
let g:local_vimrc = '.vimrc_local.vim'
```

_For users who don't wish to set `g:local_vimrc`, you can
`ln -s .vimrc_local.vim _vimrc_local.vim`.  Note: `_vimrc_local.vim` is ignored
by our `.gitignore`_

## Release History
_(Nothing yet)_

## License
Released into the public domain (per CC0).
