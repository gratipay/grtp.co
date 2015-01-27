 Gratipay Widgets - [grtp.co][] [![Builds][]][Travis] [![Deps][]][Gemnasium] [![Tips][]][Gratipay]
================================

Gratipay Widgets v2 + v1 API

v1 readme is over at [README.v1.md](README.v1.md).

[Builds]: http://img.shields.io/Travis-ci/gratipay/grtp.co.png "Build Status"
[Travis]: https://travis-ci.org/gratipay/grtp.co
[Deps]: https://Gemnasium.com/gratipay/grtp.co.png "Dependency Status"
[Gemnasium]: https://gemnasium.com/gratipay/grtp.co
[Tips]: https://img.shields.io/gratipay/gratipay.svg
[Gratipay]: https://gratipay.com/Gratipay/


## Getting Started
```
$ git clone git@github.com:gratipay/grtp.co.git
$ cd grtp.co
$ make test run
```

The widget server should then be listening on http://localhost:5000/.


## Deployment
Before deployment, you'll need someone with access to the production server to
[add your SSH key](#adding-keys).

```
$ git remote add production dokku@grtp.co:production
$ git push production
```

### Adding Keys
_TODO_

```
$ echo 'PUBLIC SSH KEY' | ssh dokku@grtp.co access:add
# or
$ cat ssh_key.pub | ssh dokku@grtp.co access:add
```

### Server Stack
The main [grtp.co][] service runs on a single [Digital Ocean][] droplet running
Ubuntu 14.04.

Below is a list of tools we use for deployment management.

- [Node.js and NPM][Node.js] - The widget server is written for Node.js, and
  uses NPM to manage dependencies.
- [Dokku-alt][] - Dokku on steroids.  It offers a Heroku-like deployment
  mechanism.
- [dokku-nginx-cache][] - A Dokku plugin that handles enabling Nginx proxy
  cache.

[Node.js]: http://nodejs.org/download/
[Dokku-alt]: https://github.com/dokku-alt/dokku-alt
[dokku-nginx-cache]: https://github.com/rummik/dokku-nginx-cache
[Digital Ocean]: https://www.digitalocean.com/


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests for any new or changed functionality. Lint and test your
code using [Gulp][].  We also highly recommend using [EditorConfig][], since it
reduces the effort needed to keep contributions in the same style.

[Gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[EditorConfig]: http://editorconfig.org

### Adding New Endpoints
For now, everything related to adding an endpoint is in `app.js`.  This will be
moved out into a small configuration pattern inside `lib/` in the future.

Until documentation is built up for this, please examine existing code and use
that as documentation.


## Licensing
Gratipay Widget source, as well as images generated using the [grtp.co][]
service, are dedicated to the Public Domain under the [CC0][] license.

[grtp.co]: https://grtp.co
[CC0]: https://creativecommons.org/publicdomain/zero/1.0/
