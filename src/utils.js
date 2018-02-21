import _ from 'lodash';
import fs from 'fs';

export const isObject = item => _.isObject(item) && !Array.isArray(item);

export const getStr = (path, options) => fs.readFileSync(path, options);
