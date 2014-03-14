# `make` or `make all` will just pass through to grunt.
# The default behavior for grunt is equivalent to `grunt test && grunt minify`.
all:
	./node_modules/.bin/grunt

# TODO: Figure out how to add a `make run`.

minify:
	./node_modules/.bin/grunt minify

test: jstest

tests: test

node_modules: package.json bower.json
	npm install
	@if [ -d node_modules ]; then touch node_modules; fi
	@if [ -d bower_components ]; then touch bower_components; fi

jstest: node_modules
	./node_modules/.bin/grunt test

clean:
	rm -rf node_modules bower_components
