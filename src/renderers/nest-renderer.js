import _ from 'lodash';
import { isTrueObject } from '../utils';

const getStr = (obj, spaceCount) =>
  Object.keys(obj).map(key =>
    (isTrueObject(obj[key]) ? getStr(obj[key]) : `${key}: ${obj[key]}`))
    .join(`\n${' '.repeat(spaceCount + 8)}`);

const getValue = (value, spaceCount) =>
  (!isTrueObject(value) ? `${value}` : `{\n${' '.repeat(spaceCount + 6)}${getStr(value, spaceCount)}\n${' '.repeat(spaceCount + 2)}}`);

const typeRender = {
  parent: (key, spaceCount, firstValue, secondValue, children, fn) =>
    `${' '.repeat(spaceCount)}  ${key}: {\n${fn(children, spaceCount + 4)}\n${' '.repeat(spaceCount + 2)}}`,
  unchanged: (key, spaceCount, firstValue) =>
    `${' '.repeat(spaceCount)}  ${key}: ${getValue(firstValue, spaceCount)}`,
  changed: (key, spaceCount, firstValue, secondValue) =>
    [`${' '.repeat(spaceCount)}+ ${key}: ${getValue(secondValue, spaceCount)}`, `${' '.repeat(spaceCount)}- ${key}: ${getValue(firstValue, spaceCount)}`],
  added: (key, spaceCount, firstValue, secondValue) =>
    `${' '.repeat(spaceCount)}+ ${key}: ${getValue(secondValue, spaceCount)}`,
  deleted: (key, spaceCount, firstValue) =>
    `${' '.repeat(spaceCount)}- ${key}: ${getValue(firstValue, spaceCount)}`,
};

export default (ast) => {
  const render = (tree, spaceCount) => {
    const result = tree.map(({
      type,
      key,
      firstValue,
      secondValue,
      children,
    }) => typeRender[type](key, spaceCount, firstValue, secondValue, children, render));
    return _.flatten(result).join('\n');
  };

  const strResult = render(ast, 2);
  return `{\n${strResult}\n}`;
};
