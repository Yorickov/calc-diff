import _ from 'lodash';

export const isTrueObject = item =>
  _.isObject(item) && !Array.isArray(item);

export const hasKeyObjects = (firstOb, secondOb, key) =>
  _.has(firstOb, key) && _.has(secondOb, key);

export const hasKeyFirstObject = (firstOb, secondOb, key) =>
  _.has(firstOb, key) && !_.has(secondOb, key);
