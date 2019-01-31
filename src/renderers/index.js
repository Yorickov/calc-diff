import nestRenderer from './nest-renderer';
import plainRenderer from './plain-renderer';
import jsonRenderer from './json-renderer';

const renderers = {
  nest: nestRenderer,
  plain: plainRenderer,
  json: jsonRenderer,
};

export default renderType => renderers[renderType];
