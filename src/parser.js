var _ = require("lodash");
function isObject(obj) {
  return _.isObject(obj) && !_.isArray(obj);
}

var _key = "";
var separator = "";
function getKeyValues(obj) {
  var values = [];
  _.forEach(Object.keys(obj).sort(), function(key) {
    if (isObject(obj[key])) {
      _key = `${_key}${key}.`;
      values = values.concat(getKeyValues(obj[key]));
      _key = "";
    } else if (Array.isArray(obj[key])) {
      _.forEach(obj[key], function(item) {
        values = values.concat(getKeyValues(item));
      });
      _key = "";
    } else {
      values.push(`${_key}${key}${separator}${obj[key]}`);
    }
  });
  return values;
}

module.exports = function(obj, _separator) {
  separator = _separator;
  return getKeyValues(obj);
};
