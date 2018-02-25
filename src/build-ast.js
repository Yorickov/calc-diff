import _ from 'lodash';
import { isTrueObject, hasKeyObjects, hasKeyFirstObject } from './utils';

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

const buildAst = (firstOb, secondOb) => {
  const keys = _.union(Object.keys(firstOb), Object.keys(secondOb));
  return keys.map((key) => {
    const { type, process } = typeParse.find(({ check }) =>
      check(firstOb, secondOb, key));

    const value = process(firstOb[key], secondOb[key], buildAst);
    return { type, key, ...value };
  });
};

export default buildAst;
