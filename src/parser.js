import yaml from 'js-yaml';
import path from 'path';

const parsers = {
  json: str => JSON.parse(str),
  yml: str => yaml.safeLoad(str),
};

export default (pathToFile) => {
  const extension = path.extname(pathToFile);
  return parsers[extension.slice(1)];
};
