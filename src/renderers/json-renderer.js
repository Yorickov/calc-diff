export default (ast, spaceFormat = 0) => {
  const render = (tree) => {
    const typeRender = {
      parent: (type, key, firstValue, secondValue, children) =>
        ({ [key]: render(children) }),
      unchanged: (type, key, firstValue) =>
        ({ type, [key]: firstValue }),
      changed: (type, key, firstValue, secondValue) =>
        ({ type, [key]: { oldValue: firstValue, newValue: secondValue } }),
      added: (type, key, firstValue, secondValue) =>
        ({ type, [key]: secondValue }),
      deleted: (type, key, firstValue) =>
        ({ type, [key]: firstValue }),
    };

    return tree.map(({
      type,
      key,
      firstValue,
      secondValue,
      children,
    }) => typeRender[type](type, key, firstValue, secondValue, children));
  };

  const arrResult = render(ast);
  const jsonResult = JSON.stringify(arrResult, '', spaceFormat);
  return jsonResult;
};
