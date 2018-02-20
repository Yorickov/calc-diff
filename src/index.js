import _ from 'lodash';
import fs from 'fs';

const propertyActions = [
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
    process: (firstKey, secondKey) => [firstKey, secondKey],
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

const mapping = {
  unchanged: (key, value) => `   ${key}: ${value}\n`,
  changed: (key, value) => ` + ${key}: ${value[1]}\n - ${key}: ${value[0]}\n`,
  added: (key, value) => ` + ${key}: ${value}\n`,
  deleted: (key, value) => ` - ${key}: ${value}\n`,
};

const parse = (firstOb, secondOb) =>
  Object.keys({ ...firstOb, ...secondOb }).map((key) => {
    const { type, process } = propertyActions.find(({ check }) =>
      check(firstOb, secondOb, key));
    const value = process(firstOb[key], secondOb[key]);
    return { type, key, value };
  });

const render = (ast) => {
  const result = ast.map(({ type, key, value }) =>
    mapping[type](key, value)).join('');
  return `{\n${result}}`;
};

export default (pathToFile1, pathToFile2) => {
  const firstOb = JSON.parse(fs.readFileSync(pathToFile1));
  const secondOb = JSON.parse(fs.readFileSync(pathToFile2));
  const ast = parse(firstOb, secondOb);
  return render(ast);
};
