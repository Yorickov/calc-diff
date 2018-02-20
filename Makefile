install:
	npm install

build:
	rm -rf dist
	npm run build

start:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.yml __tests__/__fixtures__/after.yml

index:
	npm run babel-node -- src/index.js

test:
	npm test

watch:
	npm run watch

lint:
	npm run eslint .

clean:
	rm -rf dist

publish:
	npm publish

.PHONY: test
