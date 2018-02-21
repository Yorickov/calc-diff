import _ from 'lodash';
import path from 'path';

import getParser from './parsers';
import renderNested from './render-nested';
import { isObject, getStr } from './utils';

const typeAstBuilders = [
  {
    type: 'parent',
    check: (firstOb, secondOb, key) =>
      isObject(firstOb[key]) && isObject(secondOb[key]),
    process: (firstValue, secondValue, fn) => ({ children: fn(firstValue, secondValue) }),
  },
  {
    type: 'unchanged',
    check: (firstOb, secondOb, key) =>
      _.has(firstOb, key) && _.has(secondOb, key) && (firstOb[key] === secondOb[key]),
    process: firstValue => ({ firstValue }),
  },
  {
    type: 'changed',
    check: (firstOb, secondOb, key) =>
      (_.has(firstOb, key) && _.has(secondOb, key) && (firstOb[key] !== secondOb[key])),
    process: (firstValue, secondValue) => ({ firstValue, secondValue }),
  },
  {
    type: 'added',
    check: (firstOb, secondOb, key) =>
      !_.has(firstOb, key) && _.has(secondOb, key),
    process: (firstValue, secondValue) => ({ secondValue }),
  },
  {
    type: 'deleted',
    check: (firstOb, secondOb, key) =>
      _.has(firstOb, key) && !_.has(secondOb, key),
    process: firstValue => ({ firstValue }),
  },
];

const getType = pathToFile => path.extname(pathToFile);

const parseToObj = (str, type) => getParser(type)(str);

const parseToAst = (firstOb, secondOb) => {
  const keys = _.union(Object.keys(firstOb), Object.keys(secondOb));

  return keys.map((key) => {
    const { type, process } = typeAstBuilders.find(({ check }) =>
      check(firstOb, secondOb, key));

    const value = process(firstOb[key], secondOb[key], parseToAst);
    return { type, key, ...value };
  });
};

export default (pathToFile1, pathToFile2) => {
  const firstStr = getStr(pathToFile1, 'utf8');
  const secondStr = getStr(pathToFile2, 'utf8');

  const firstType = getType(pathToFile1);
  const secondType = getType(pathToFile2);

  const firstOb = parseToObj(firstStr, firstType);
  const secondOb = parseToObj(secondStr, secondType);

  const ast = parseToAst(firstOb, secondOb);
  return renderNested(ast);
};
