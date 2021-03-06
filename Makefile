# `make` or `make all` will just pass through to grunt.
# The default behavior for grunt is equivalent to `grunt test && grunt build`.
all: node_modules test build

run: node_modules
	npm start

build: node_modules
	npm run build

test: jstest

tests: jstest

node_modules: package.json
	npm install
	@if [ -d node_modules ]; then touch node_modules; fi

jstest: node_modules
	npm test

clean:
	rm -rf node_modules
