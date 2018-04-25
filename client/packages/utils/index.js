'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTitleCase = exports.withLoad = exports.getNameById = exports.getPropById = exports.findByName = exports.findById = exports.findByProp = exports.desc = exports.name = exports.ml = exports.api = exports.isDev = exports.tap = exports.cdurl = undefined;

var _ramda = require('ramda');

var _recompose = require('recompose');

var cdurl = exports.cdurl = function cdurl(l, c, n) {
  return l.cdVersion ? 'http://res.cloudinary.com/vttc/image/upload/v' + l.cdVersion + '/' + c + '/' + n + '.jpg' : '';
};

var tap = exports.tap = (0, _ramda.tap)(console.log);

var isDev = exports.isDev = function isDev() {
  return process.env.NODE_ENV === 'development';
};

var api = exports.api = (isDev() ? 'http://localhost:8080' : '') + '/api/';

var ml = exports.ml = function ml(p) {
  return function (o) {
    return o[p + '_' + window.lang] || o[p];
  };
};
var name = exports.name = ml('name');
var desc = exports.desc = ml('desc');

var findByProp = exports.findByProp = function findByProp(p) {
  return function (v) {
    return function (l) {
      return (0, _ramda.find)(function (x) {
        return x[p] == v;
      }, l || []);
    };
  };
};
var findById = exports.findById = findByProp('id');
var findByName = exports.findByName = findByProp('name');

var getPropById = exports.getPropById = function getPropById(p) {
  return function (id) {
    return (0, _ramda.pipe)(findById(id), (0, _ramda.prop)(p));
  };
};
var getNameById = exports.getNameById = getPropById('name');

var withLoad = exports.withLoad = function withLoad(f, p) {
  return (0, _recompose.lifecycle)({
    componentWillMount: function componentWillMount() {
      this.props[f](this.props[p]);
    }
  });
};

var toTitleCase = exports.toTitleCase = function toTitleCase(s) {
  return s.replace(/\w\S*/g, function (t) {
    return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
  });
};