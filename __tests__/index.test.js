import fs from 'fs';
import genDiff from '../src';

const jsonPathFirst = '__tests__/__fixtures__/before.json';
const jsonPathSecond = '__tests__/__fixtures__/after.json';

const yamlPathFirst = '__tests__/__fixtures__/before.yml';
const yamlPathSecond = '__tests__/__fixtures__/after.yml';

const iniPathFirst = '__tests__/__fixtures__/before.ini';
const iniPathSecond = '__tests__/__fixtures__/after.ini';

const diffPath = '__tests__/__fixtures__/diff.txt';

it('json flat', () => {
  const received = genDiff(jsonPathFirst, jsonPathSecond);
  const expected = fs.readFileSync(diffPath, 'utf8');
  expect(received).toBe(expected);
});

it('yaml flat', () => {
  const received = genDiff(yamlPathFirst, yamlPathSecond);
  const expected = fs.readFileSync(diffPath, 'utf8');
  expect(received).toBe(expected);
});

it('ini flat', () => {
  const received = genDiff(iniPathFirst, iniPathSecond);
  const expected = fs.readFileSync(diffPath, 'utf8');
  expect(received).toBe(expected);
});
