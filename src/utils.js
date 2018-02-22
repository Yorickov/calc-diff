import _ from 'lodash';

export default item => _.isObject(item) && !Array.isArray(item);
