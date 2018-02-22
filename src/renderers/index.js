import renderNest from './render-nest';
import renderPlain from './render-plain';

const renderers = {
  nest: renderNest,
  plain: renderPlain,
};

export default typeRender => renderers[typeRender];
