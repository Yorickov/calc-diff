import { isTrueObject, hasKeyInObjects, hasKeyInFirstObject, mergeObjectKeys } from './utils';

const keyTypes = [
  {
    type: 'parent',
    check: (firstOb, secondOb, key) =>
      isTrueObject(firstOb[key]) && isTrueObject(secondOb[key]),
    process: (firstValue, secondValue, fn) => ({ children: fn(firstValue, secondValue) }),
  },
  {
    type: 'unchanged',
    check: (firstOb, secondOb, key) =>
      hasKeyInObjects(firstOb, secondOb, key) && (firstOb[key] === secondOb[key]),
    process: firstValue => ({ firstValue }),
  },
  {
    type: 'changed',
    check: (firstOb, secondOb, key) =>
      (hasKeyInObjects(firstOb, secondOb, key) && (firstOb[key] !== secondOb[key])),
    process: (firstValue, secondValue) => ({ firstValue, secondValue }),
  },
  {
    type: 'added',
    check: (firstOb, secondOb, key) =>
      hasKeyInFirstObject(secondOb, firstOb, key),
    process: (firstValue, secondValue) => ({ secondValue }),
  },
  {
    type: 'deleted',
    check: (firstOb, secondOb, key) =>
      hasKeyInFirstObject(firstOb, secondOb, key),
    process: firstValue => ({ firstValue }),
  },
];

const buildAst = (firstOb, secondOb) => {
  const keys = mergeObjectKeys(firstOb, secondOb);
  return keys.map((key) => {
    const { type, process } = keyTypes.find(({ check }) =>
      check(firstOb, secondOb, key));

    const value = process(firstOb[key], secondOb[key], buildAst);
    return { type, key, ...value };
  });
};

export default buildAst;
