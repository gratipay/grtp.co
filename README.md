grtp.co [![Builds][]][Travis] [![Deps][]][Gemnasium]
=======

Gratipay widgets + widget API

[Builds]: http://img.shields.io/Travis-ci/gratipay/grtp.co.png "Build Status"
[Travis]: https://travis-ci.org/gratipay/grtp.co
[Deps]: https://Gemnasium.com/gratipay/grtp.co.png "Dependency Status"
[Gemnasium]: https://gemnasium.com/gratipay/grtp.co

## Getting Started
Quickstart:
```
$ git clone git@github.com:gratipay/grtp.co.git
$ cd grtp.co
$ make run
```

Then visit <http://localhost:9537/test/>

## Documentation
JSDoc comments are used, but documentation generation is not setup yet. The
code is documented, please dive in.

Configuration options:
- `window.grtpAPI` - Where to look for the grtp.co API
  - defaults to `//grtp.co/v1/`
- `window.gratipayURI` - Where to look for Gratipay
  - defaults to `https://gratipay.com/`

## Examples
In the following examples, just switch out `rummik` with your Gratipay username.

### Standard Widgets
![](https://cloud.githubusercontent.com/assets/134455/4095888/3e6d7758-2fba-11e4-935f-14e30c32ac1e.png)
```html
<script data-gratipay-username="~rummik"
  src="//grtp.co/v1.js" async></script>
```

![](https://cloud.githubusercontent.com/assets/134455/4095889/3fb3b5f0-2fba-11e4-8adb-250a0dc4e9cf.png)
```html
<script data-gratipay-username="~rummik"
  data-gratipay-widget="button"
  src="//grtp.co/v1.js" async></script>
```

![](https://cloud.githubusercontent.com/assets/134455/4095908/997bc05a-2fba-11e4-99cb-56ad9cbad392.png)
```html
<script data-gratipay-username="~rummik"
  data-gratipay-widget="giving"
  src="//grtp.co/v1.js" async></script>
```

### Custom Widgets
You can create your own widgets by adding `data-gratipay-widget="custom"` to your
widget's HTML, and the following classes:

- Text
  - `gratipay-receiving` - dollar-sign prefixed value of `receiving`
  - `gratipay-username` - the user's username
  - `gratipay-goal` - dollar-sign prefixed value of `goal`
  - `gratipay-giving` - dollar-sign prefixed value of `giving`
  - `gratipay-identity` - `I` if `number` is `singular`, `We` if `number` is
    `plural`
- Links
  - `gratipay-profile-link` - sets the `href` attribute to the user's profile
    link
  - `gratipay-link` - sets the `href` attribute to https://gratipay.com/
- Misc styling
  - `gratipay-goal-progress-bar` - sets the element's width to a percentage value
    of the user's goal progress


```html
<div data-gratipay-username="~rummik" data-gratipay-widget="custom">
  I receive <a class="gratipay-profile-link">
    <span class="gratipay-receiving">$0.00</span> / wk
  </a>
  on <a class="gratipay-link">Gratipay</a>.
</div>
<script src="//grtp.co/v1.js"></script>
```


## Other Widgets
[Shields.io](http://shields.io): [![](http://img.shields.io/gratipay/Gratipay.svg)](http://shields.io)
```html
<img src="http://img.shields.io/gratipay/Gratipay.svg">
```

[Google Gadget](lib/v1/blogger) for Blogger.

## Release and Deployment
Grtp.co is hosted on a Digital Ocean VPS (called `droplet`) accessible
through SSH. It runs nginx and the publishing root is
`/home/grtp.co/production`. 

To access the server, you need someone who already has access to add
your key to `/home/grtp.co/.ssh/authorized_keys`

#### Configure
If you need to alter nginx configuration, it is stored at
`/etc/nginx/sites-enabled/grtp.co`

After you make changes, you can reload configuration:

```
# service nginx reload
```

#### Deploy
Bump version in `package.json` and create new tag.

Add the remote to your own local repo:

```
$ git remote add prod grtp@grtp.co:production
```

Then you can `git push prod`. There's a post-receive hook that updates the
filesystem on the droplet and runs the grunt `build` task that minifies
code and copies files from `lib` to `www`.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [grunt](https://github.com/gruntjs/grunt).

To help keep a consistent style, we also recommend using
[EditorConfig](http://editorconfig.org).


## License
Released into the public domain (per CC0).
