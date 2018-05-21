# calc-diff

[![Build Status](https://travis-ci.org/Yorickov/calc-diff.svg?branch=master)](https://travis-ci.org/Yorickov/calc-diff)
[![Maintainability](https://api.codeclimate.com/v1/badges/4f516136304355c04581/maintainability)](https://codeclimate.com/github/Yorickov/calc-diff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4f516136304355c04581/test_coverage)](https://codeclimate.com/github/Yorickov/calc-diff/test_coverage)

CLI-utility, compares two configuration files (ini, json, yaml) and shows a difference in selected format (plain, nested, json)

*Educational project Hexlet.io, Javascript/Back-End, p.2*

## Technologies
- npm / Babel / ESLint
- Jest
- commander

## Feautures
- tree traversal
- data-driven programming
- design patterns: Adapter, Facade, Strategy
- test-driven development: unit testing

## Setup
`make install`

*`npm install -g calc-diff`*

## Usage
```
$ gendiff [options] <firstConfig> <secondConfig>
Options:
    -h, --help          output usage information
	-V, --version       output the version number
	-f, --format [type] output file format
Type: plain, nest, json
```

## Example
```
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted
Setting "common.setting4" added with value "blah blah"
Setting "group1.baz" changed from "bas" to "bars"
Section "group2" deleted
```
