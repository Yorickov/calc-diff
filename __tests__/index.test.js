import fs from 'fs';
import genDiff from '../src';

const jsonPathFirst = '__tests__/__fixtures__/before.json';
const jsonPathSecond = '__tests__/__fixtures__/after.json';

const yamlPathFirst = '__tests__/__fixtures__/before.yml';
const yamlPathSecond = '__tests__/__fixtures__/after.yml';

const iniPathFirst = '__tests__/__fixtures__/before.ini';
const iniPathSecond = '__tests__/__fixtures__/after.ini';

const diffPath = '__tests__/__fixtures__/diff.txt';

const jsonNestPathFirst = '__tests__/__fixtures__/before-nest.json';
const jsonNestPathSecond = '__tests__/__fixtures__/after-nest.json';

const yamlNestPathFirst = '__tests__/__fixtures__/before-nest.yml';
const yamlNestPathSecond = '__tests__/__fixtures__/after-nest.yml';

const inilNestPathFirst = '__tests__/__fixtures__/before-nest.yml';
const inilNestPathSecond = '__tests__/__fixtures__/after-nest.yml';

const diffNestPath = '__tests__/__fixtures__/diff-nest.txt';
const diffPlainPath = '__tests__/__fixtures__/diff-plain.txt';
const diffJsonPath = '__tests__/__fixtures__/diff-json.json';

describe('flat structure - nested-render', () => {
  it('json', () => {
    const received = genDiff(jsonPathFirst, jsonPathSecond, 'nest');
    const expected = fs.readFileSync(diffPath, 'utf8');
    expect(received).toMatch(expected);
  });

  it('yaml', () => {
    const received = genDiff(yamlPathFirst, yamlPathSecond, 'nest');
    const expected = fs.readFileSync(diffPath, 'utf8');
    expect(received).toMatch(expected);
  });

  it('ini', () => {
    const received = genDiff(iniPathFirst, iniPathSecond, 'nest');
    const expected = fs.readFileSync(diffPath, 'utf8');
    expect(received).toMatch(expected);
  });
});

describe('nested structure - nested-render', () => {
  it('json', () => {
    const received = genDiff(jsonNestPathFirst, jsonNestPathSecond, 'nest');
    const expected = fs.readFileSync(diffNestPath, 'utf8');
    expect(received).toMatch(expected);
  });

  it('yaml', () => {
    const received = genDiff(yamlNestPathFirst, yamlNestPathSecond, 'nest');
    const expected = fs.readFileSync(diffNestPath, 'utf8');
    expect(received).toMatch(expected);
  });

  it('ini', () => {
    const received = genDiff(inilNestPathFirst, inilNestPathSecond, 'nest');
    const expected = fs.readFileSync(diffNestPath, 'utf8');
    expect(received).toMatch(expected);
  });
});

describe('nested structure - plain-render', () => {
  it('json', () => {
    const received = genDiff(jsonNestPathFirst, jsonNestPathSecond, 'plain');
    const expected = fs.readFileSync(diffPlainPath, 'utf8');
    expect(received).toMatch(expected);
  });

  it('yaml', () => {
    const received = genDiff(yamlNestPathFirst, yamlNestPathSecond, 'plain');
    const expected = fs.readFileSync(diffPlainPath, 'utf8');
    expect(received).toMatch(expected);
  });

  it('ini', () => {
    const received = genDiff(inilNestPathFirst, inilNestPathSecond, 'plain');
    const expected = fs.readFileSync(diffPlainPath, 'utf8');
    expect(received).toMatch(expected);
  });
});

describe('nested structure - json-render', () => {
  it('json', () => {
    const received = genDiff(jsonNestPathFirst, jsonNestPathSecond, 'json');
    const expected = fs.readFileSync(diffJsonPath, 'utf8');
    expect(received).toMatch(expected);
  });

  it('yaml', () => {
    const received = genDiff(yamlNestPathFirst, yamlNestPathSecond, 'json');
    const expected = fs.readFileSync(diffJsonPath, 'utf8');
    expect(received).toMatch(expected);
  });

  it('ini', () => {
    const received = genDiff(inilNestPathFirst, inilNestPathSecond, 'json');
    const expected = fs.readFileSync(diffJsonPath, 'utf8');
    expect(received).toMatch(expected);
  });
});
