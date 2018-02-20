import fs from 'fs';
import genDiff from '../src';

it('json', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json'))
    .toBe(fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf8'));
});
