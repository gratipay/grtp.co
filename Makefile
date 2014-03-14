clean:
	rm -rf node_modules bower_components

# TODO: Figure out how to add a `make run`.

test: jstest

tests: test

node_modules: package.json bower.json
	npm install
	@if [ -d node_modules ]; then touch node_modules; fi
	@if [ -d bower_components ]; then touch bower_components; fi

jstest: node_modules
	./node_modules/.bin/grunt test

