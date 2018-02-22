install:
	npm install

build:
	rm -rf dist
	npm run build

plain:
	npm run babel-node -- src/bin/gendiff.js --format plain __tests__/__fixtures__/before-nest.json __tests__/__fixtures__/after-nest.json

nest:
	npm run babel-node -- src/bin/gendiff.js --format nest __tests__/__fixtures__/before-nest.json __tests__/__fixtures__/after-nest.json

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
