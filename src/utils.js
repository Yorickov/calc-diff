import _ from 'lodash';

export const isTrueObject = item =>
  _.isObject(item) && !Array.isArray(item);

export const hasKeyInObjects = (firstOb, secondOb, key) =>
  _.has(firstOb, key) && _.has(secondOb, key);

export const hasKeyInFirstObject = (firstOb, secondOb, key) =>
  _.has(firstOb, key) && !_.has(secondOb, key);

export const mergeObjectKeys = (firstOb, secondOb) =>
  _.union(Object.keys(firstOb), Object.keys(secondOb));

export const flatten = arr => _.flatten(arr);
