import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const parsers = {
  json: str => JSON.parse(str),
  yml: str => yaml.safeLoad(str),
  ini: str => ini.parse(str),
};

export default (pathToFile) => {
  const extension = path.extname(pathToFile);
  return parsers[extension.slice(1)];
};
