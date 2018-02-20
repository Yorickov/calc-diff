import _ from 'lodash';
import fs from 'fs';

import parser from './parser';
import render from './render';

const typeAstBuilders = [
  {
    type: 'unchanged',
    check: (firstOb, secondOb, key) =>
      _.has(firstOb, key) && _.has(secondOb, key) && (firstOb[key] === secondOb[key]),
    process: firstKey => firstKey,
  },
  {
    type: 'changed',
    check: (firstOb, secondOb, key) =>
      (_.has(firstOb, key) && _.has(secondOb, key) && (firstOb[key] !== secondOb[key])),
    process: (firstKey, secondKey) => ({ first: firstKey, second: secondKey }),
  },
  {
    type: 'added',
    check: (firstOb, secondOb, key) => !_.has(firstOb, key) && _.has(secondOb, key),
    process: (firstKey, secondKey) => secondKey,
  },
  {
    type: 'deleted',
    check: (firstOb, secondOb, key) => _.has(firstOb, key) && !_.has(secondOb, key),
    process: firstKey => firstKey,
  },
];

const parse = (firstOb, secondOb) => {
  const keys = _.union(Object.keys(firstOb), Object.keys(secondOb));

  return keys.map((key) => {
    const { type, process } = typeAstBuilders.find(({ check }) =>
      check(firstOb, secondOb, key));
    const value = process(firstOb[key], secondOb[key]);
    return { type, key, value };
  });
};

const getStr = (path, options) => fs.readFileSync(path, options);

export default (pathToFile1, pathToFile2) => {
  const firstStr = getStr(pathToFile1, 'utf8');
  const secondStr = getStr(pathToFile2, 'utf8');

  const firstOb = parser(pathToFile1)(firstStr);
  const secondOb = parser(pathToFile2)(secondStr);
  const ast = parse(firstOb, secondOb);
  return render(ast);
};
