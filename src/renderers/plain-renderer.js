import isTrueObject from '../utils';

export default (ast) => {
  const getTypeValue = value => (typeof value === 'string' ? `'${value}'` : `${value}`);
  const getValue = value => (isTrueObject(value) ? 'complex value' : getTypeValue(value));

  const render = (tree, pathStr) => {
    const typeRender = {
      parent: (key, firstValue, secondValue, children) =>
        render(children, `${pathStr}${key}.`),
      changed: (key, firstValue, secondValue) =>
        `Property '${pathStr}${key}' was updated. From ${getValue(firstValue)} to ${getValue(secondValue)}`,
      added: (key, firstValue, secondValue) =>
        `Property '${pathStr}${key}' was added with value: ${getValue(secondValue)}`,
      deleted: key =>
        `Property '${pathStr}${key}' was removed`,
    };

    return tree
      .filter(({ type }) => type !== 'unchanged')
      .map(({
        type,
        key,
        firstValue,
        secondValue,
        children,
      }) => typeRender[type](key, firstValue, secondValue, children))
      .join('\n');
  };

  const strResult = render(ast, '');
  return `\n${strResult}\n`;
};
