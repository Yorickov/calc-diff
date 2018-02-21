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

describe('flar tests', () => {
  it('json', () => {
    const received = genDiff(jsonPathFirst, jsonPathSecond);
    const expected = fs.readFileSync(diffPath, 'utf8');
    expect(received).toEqual(expected);
  });

  it('yaml', () => {
    const received = genDiff(yamlPathFirst, yamlPathSecond);
    const expected = fs.readFileSync(diffPath, 'utf8');
    expect(received).toEqual(expected);
  });

  it('ini', () => {
    const received = genDiff(iniPathFirst, iniPathSecond);
    const expected = fs.readFileSync(diffPath, 'utf8');
    expect(received).toEqual(expected);
  });
});

describe('nested tests', () => {
  it('json', () => {
    const received = genDiff(jsonNestPathFirst, jsonNestPathSecond);
    const expected = fs.readFileSync(diffNestPath, 'utf8');
    expect(received).toEqual(expected);
  });

  it('yaml', () => {
    const received = genDiff(yamlNestPathFirst, yamlNestPathSecond);
    const expected = fs.readFileSync(diffNestPath, 'utf8');
    expect(received).toEqual(expected);
  });

  it('ini', () => {
    const received = genDiff(inilNestPathFirst, inilNestPathSecond);
    const expected = fs.readFileSync(diffNestPath, 'utf8');
    expect(received).toEqual(expected);
  });
});
