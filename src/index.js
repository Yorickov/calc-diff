import path from 'path';
import fs from 'fs';

import buildAst from './build-ast';
import getParser from './parsers';
import getRenderer from './renderers';

const getTypeFile = pathToFile => path.extname(pathToFile);

const parseToObj = (str, typeFile) => getParser(typeFile)(str);

export default (pathToFile1, pathToFile2, typeRender) => {
  const firstStr = fs.readFileSync(pathToFile1, 'utf8');
  const secondStr = fs.readFileSync(pathToFile2, 'utf8');

  const firstType = getTypeFile(pathToFile1);
  const secondType = getTypeFile(pathToFile2);

  const firstOb = parseToObj(firstStr, firstType);
  const secondOb = parseToObj(secondStr, secondType);

  const ast = buildAst(firstOb, secondOb);
  return getRenderer(typeRender)(ast);
};
