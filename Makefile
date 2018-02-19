install:
	npm install

build:
	rm -rf dist
	npm run build

start:
	npm run babel-node -- src/bin/gendiff.js -h

test:
	npm test

lint:
	npm run eslint ./src

clean:
	rm -rf dist

publish:
	npm publish

.PHONY: test
