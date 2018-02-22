import _ from 'lodash';
import isTrueObject from './utils';

export default (ast) => {
  const render = (tree, spaceCount) => {
    const beforeKey = ' '.repeat(spaceCount);

    const getValue = (value) => {
      if (!isTrueObject(value)) {
        return `${value}`;
      }
      const getStr = obj =>
        Object.keys(obj).map(key =>
          (isTrueObject(obj[key]) ? getStr(obj[key]) : `${key}: ${obj[key]}`))
          .join(`\n${' '.repeat(beforeKey + 6)}`);

      const str = `${' '.repeat(spaceCount + 6)}${getStr(value)}\n${' '.repeat(spaceCount + 2)}`;
      return `{\n${str}}`;
    };

    const typeRender = {
      parent: (key, firstValue, secondValue, children) =>
        `${beforeKey}  ${key}: {\n${render(children, spaceCount + 4)}\n${' '.repeat(spaceCount + 2)}}`,
      unchanged: (key, firstValue) =>
        `${beforeKey}  ${key}: ${getValue(firstValue)}`,
      changed: (key, firstValue, secondValue) =>
        [`${beforeKey}+ ${key}: ${getValue(secondValue)}`, `${beforeKey}- ${key}: ${getValue(firstValue)}`],
      added: (key, firstValue, secondValue) =>
        `${beforeKey}+ ${key}: ${getValue(secondValue)}`,
      deleted: (key, firstValue) =>
        `${beforeKey}- ${key}: ${getValue(firstValue)}`,
    };

    const result = tree.map(({
      type,
      key,
      firstValue,
      secondValue,
      children,
    }) => typeRender[type](key, firstValue, secondValue, children));
    return _.flatten(result).join('\n');
  };

  const str = render(ast, 2);
  return `{\n${str}\n}`;
};
