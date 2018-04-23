'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLoad = exports.api = exports.isDev = exports.tap = exports.cdurl = undefined;

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

var withLoad = exports.withLoad = function withLoad(f, ps) {
  return (0, _recompose.lifecycle)({
    componentWillMount: function componentWillMount() {
      this.props[f](ps);
    }
  });
};