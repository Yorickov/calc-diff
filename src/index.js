import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import getRenderer from './renderers';
import isTrueObject from './utils';
import getParser from './parsers';

const hasKeyObjects = (firstOb, secondOb, key) => _.has(firstOb, key) && _.has(secondOb, key);
const hasKeyFirstObject = (firstOb, secondOb, key) => _.has(firstOb, key) && !_.has(secondOb, key);

const typeParse = [
  {
    type: 'parent',
    check: (firstOb, secondOb, key) =>
      isTrueObject(firstOb[key]) && isTrueObject(secondOb[key]),
    process: (firstValue, secondValue, fn) => ({ children: fn(firstValue, secondValue) }),
  },
  {
    type: 'unchanged',
    check: (firstOb, secondOb, key) =>
      hasKeyObjects(firstOb, secondOb, key) && (firstOb[key] === secondOb[key]),
    process: firstValue => ({ firstValue }),
  },
  {
    type: 'changed',
    check: (firstOb, secondOb, key) =>
      (hasKeyObjects(firstOb, secondOb, key) && (firstOb[key] !== secondOb[key])),
    process: (firstValue, secondValue) => ({ firstValue, secondValue }),
  },
  {
    type: 'added',
    check: (firstOb, secondOb, key) =>
      hasKeyFirstObject(secondOb, firstOb, key),
    process: (firstValue, secondValue) => ({ secondValue }),
  },
  {
    type: 'deleted',
    check: (firstOb, secondOb, key) =>
      hasKeyFirstObject(firstOb, secondOb, key),
    process: firstValue => ({ firstValue }),
  },
];

const getTypeFile = pathToFile => path.extname(pathToFile);
const parseToObj = (str, typeFile) => getParser(typeFile)(str);

const parseToAst = (firstOb, secondOb) => {
  const keys = _.union(Object.keys(firstOb), Object.keys(secondOb));

  return keys.map((key) => {
    const { type, process } = typeParse.find(({ check }) =>
      check(firstOb, secondOb, key));

    const value = process(firstOb[key], secondOb[key], parseToAst);
    return { type, key, ...value };
  });
};

export default (pathToFile1, pathToFile2, typeRender) => {
  const firstStr = fs.readFileSync(pathToFile1, 'utf8');
  const secondStr = fs.readFileSync(pathToFile2, 'utf8');

  const firstType = getTypeFile(pathToFile1);
  const secondType = getTypeFile(pathToFile2);

  const firstOb = parseToObj(firstStr, firstType);
  const secondOb = parseToObj(secondStr, secondType);

  const ast = parseToAst(firstOb, secondOb);
  return getRenderer(typeRender)(ast);
};
