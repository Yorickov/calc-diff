const typeRender = {
  unchanged: (key, value) => `   ${key}: ${value}\n`,
  changed: (key, { first, second }) => ` + ${key}: ${second}\n - ${key}: ${first}\n`,
  added: (key, value) => ` + ${key}: ${value}\n`,
  deleted: (key, value) => ` - ${key}: ${value}\n`,
};

export default (ast) => {
  const result = ast.map(({ type, key, value }) =>
    typeRender[type](key, value)).join('');
  return `{\n${result}}`;
}
