const renderTypes = {
  parent: (type, key, firstValue, secondValue, children, fn) =>
    ({ [key]: fn(children) }),
  unchanged: (type, key, firstValue) =>
    ({ type, [key]: firstValue }),
  changed: (type, key, firstValue, secondValue) =>
    ({ type, [key]: { oldValue: firstValue, newValue: secondValue } }),
  added: (type, key, firstValue, secondValue) =>
    ({ type, [key]: secondValue }),
  deleted: (type, key, firstValue) =>
    ({ type, [key]: firstValue }),
};

export default (ast, spaceFormat = 0) => {
  const renderToArr = tree =>
    tree.map(({
      type,
      key,
      firstValue,
      secondValue,
      children,
    }) => renderTypes[type](type, key, firstValue, secondValue, children, renderToArr));

  const renderedArr = renderToArr(ast);
  const renderedStr = JSON.stringify(renderedArr, '', spaceFormat);
  return renderedStr;
};
