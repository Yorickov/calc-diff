import { isTrueObject } from '../utils';

const getTypeValue = value => (typeof value === 'string' ? `'${value}'` : `${value}`);
const getValue = value => (isTrueObject(value) ? 'complex value' : getTypeValue(value));

const typeRender = {
  parent: (key, firstValue, secondValue, children, fn) =>
    fn(children, `${key}`),
  changed: (key, firstValue, secondValue) =>
    `Property '${key}' was updated. From ${getValue(firstValue)} to ${getValue(secondValue)}`,
  added: (key, firstValue, secondValue) =>
    `Property '${key}' was added with value: ${getValue(secondValue)}`,
  deleted: key =>
    `Property '${key}' was removed`,
};

export default (ast) => {
  const render = (tree, pathStr) =>
    tree
      .filter(({ type }) => type !== 'unchanged')
      .map(({
        type,
        key,
        firstValue,
        secondValue,
        children,
      }) => {
        const newKey = pathStr ? `${pathStr}.${key}` : key;
        return typeRender[type](newKey, firstValue, secondValue, children, render);
      })
      .join('\n');

  const strResult = render(ast, '');
  return `\n${strResult}\n`;
};
