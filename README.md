
grtp.co [![Builds][]][Travis]
=======

Gratipay Widgets + API

[Builds]: https://img.shields.io/travis/gratipay/grtp.co.svg "Build Status"
[Travis]: https://travis-ci.org/gratipay/grtp.co


## Getting Started with Development

Quickstart:
```
$ git clone git@github.com:gratipay/grtp.co.git
$ cd grtp.co
$ make run
```

Then visit <http://localhost:9537/test/>. For more details, read
Development section below.


## Documentation

For now documentation for widgets API is present in JSDoc comments,
but not generated into more readable format.

Configuration options:
- `window.grtpAPI` - Where to look for the grtp.co API
  - defaults to `https://grtp.co/v2/`
- `window.gratipayURI` - Where to look for Gratipay
  - defaults to `https://gratipay.com/`


## Examples

In the following examples, just switch out `my-project` with your Gratipay Project slug.

### Standard Widgets
![](https://cloud.githubusercontent.com/assets/3729038/16357975/9584b358-3acb-11e6-821c-ece9d855dca1.png)
```html
<script data-gratipay-projectslug="my-project"
  src="https://grtp.co/v2.js" async></script>
```

### Custom Widgets
You can create your own widgets by adding `data-gratipay-widget="custom"` to your
widget's HTML, and the following classes:

- Text
  - `gratipay-projectslug` - the Project's slug
  - `gratipay-receiving` - dollar-sign prefixed value of `receiving`
- Links
  - `gratipay-profile-link` - sets the `href` attribute to the Project's profile
    link
  - `gratipay-link` - sets the `href` attribute to https://gratipay.com/
- Misc styling


```html
<div data-gratipay-projectslug="my-project" data-gratipay-widget="custom">
  I receive <a class="gratipay-profile-link">
    <span class="gratipay-receiving">$0.00</span> / wk
  </a>
  on <a class="gratipay-link">Gratipay</a>.
</div>
<script src="https://grtp.co/v2.js"></script>
```


## [Shields.io](http://shields.io)

Shields can be created for ~users or projects:

### Projects

```html
<img src="http://img.shields.io/gratipay/team/Gratipay.svg">
```

```markdown
[![](http://img.shields.io/gratipay/team/Gratipay.svg)]()
```

[![](http://img.shields.io/gratipay/team/Gratipay.svg)]()

(Shields.io still uses "team" rather than "project.")

### ~users

```html
<img src="http://img.shields.io/gratipay/user/zzzeek.svg">
```

```markdown
[![](http://img.shields.io/gratipay/user/zzzeek.svg)]()
```

[![](http://img.shields.io/gratipay/user/zzzeek.svg)]()

## Other Widgets

[Google Gadget](lib/v2/blogger) for Blogger.


## Development

https://grtp.co/ is a static site. But it is generated from sources.

Typical site like https://gratipay.com/ is divided into `backend` and
`frontend`. `backend` is Python code that runs on server side.
`frontend` is HTML+CSS+Javascript that is processed by browser.

https://grtp.co/ is pure `frontend`, but its HTML+CSS+Javascript
sources from repository are not what is being run on the site.
Before sources can be deployed, they need to be minified, tested and,
if you write styles in SASS, the .sass files need to be compiled into
CSS. So repository layout looks like:

    lib/   - source files that need to be compiled
    www/   - static files that are copied as-is

Javascript tools to build, lint and test source are similar to Python
tools. This can be matched approximately as this:

    JavaScript     |  Python
    --------------------------------------------------------
    npm            |  pip
    package.json   |  setup.py, setup.cfg, requirements.txt
    Grunt          |  make, fabric, SCons
    Gruntfile.js   |  Makefile, fabfile.py, SConstruct

Grunt is popular JS build systems, and there are many others, like
Gulp for example. It should be noted that `npm` itself has some kind
of dependency management, so you may not need Grunt at all.

http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/


### Release and Deployment

Grtp.co is hosted on Heroku. 

#### Deploy

Bump version in `package.json` and create new tag.

Add the Heroku remote to your own local repo:

```
git remote add heroku https://git.heroku.com/grtp.git
```

Then you can `git push heroku master`. The
[`heroku/nodejs`](https://github.com/heroku/heroku-buildpack-nodejs)
buildpack will then `npm build` the sources and save them in [www/](www/).
[`heroku-buildpack-static`](https://github.com/heroku/heroku-buildpack-static)
takes over and serves web requests from the `www` directory.


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [grunt](https://github.com/gruntjs/grunt).

To help keep a consistent style, we also recommend using
[EditorConfig](http://editorconfig.org).


## License

Released into the public domain (per CC0).
