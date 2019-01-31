import { isTrueObject, flatten } from '../utils';

const getStrFromObj = (obj, spaceCount) =>
  Object.keys(obj).map(key =>
    (isTrueObject(obj[key]) ? getStrFromObj(obj[key]) : `${key}: ${obj[key]}`))
    .join(`\n${' '.repeat(spaceCount + 8)}`);

const getValue = (value, spaceCount) =>
  (!isTrueObject(value) ? `${value}` : `{\n${' '.repeat(spaceCount + 6)}${getStrFromObj(value, spaceCount)}\n${' '.repeat(spaceCount + 2)}}`);

const renderTypes = {
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
  const renderToStr = (tree, spaceCount) => {
    const result = tree.map(({
      type,
      key,
      firstValue,
      secondValue,
      children,
    }) => renderTypes[type](key, spaceCount, firstValue, secondValue, children, renderToStr));
    return flatten(result).join('\n');
  };

  const renderedStr = renderToStr(ast, 2);
  return `{\n${renderedStr}\n}`;
};
