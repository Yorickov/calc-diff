import path from 'path';
import fs from 'fs';

import buildAst from './build-ast';
import getParser from './parsers';
import getRenderer from './renderers';

const getFileType = pathToFile => path.extname(pathToFile);

const parseToObj = (str, fileType) => {
  const parser = getParser(fileType);
  return parser(str);
};

export default (pathToFirstFile, pathToSevondFile, typeRender) => {
  const firstFileContent = fs.readFileSync(pathToFirstFile, 'utf8');
  const secondFileContent = fs.readFileSync(pathToSevondFile, 'utf8');

  const firstFileType = getFileType(pathToFirstFile);
  const secondFileType = getFileType(pathToSevondFile);

  const firstOb = parseToObj(firstFileContent, firstFileType);
  const secondOb = parseToObj(secondFileContent, secondFileType);

  const ast = buildAst(firstOb, secondOb);
  const render = getRenderer(typeRender);
  return render(ast);
};
