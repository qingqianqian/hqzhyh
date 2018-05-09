'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTitleCase = exports.withParams = exports.withDetail = exports.withLang = exports.withSuccess = exports.withNewValue = exports.withLoad = exports.getNameById = exports.getPropById = exports.findByName = exports.findById = exports.findByProp = exports.desc = exports.name = exports.ml = exports.admin = exports.api = exports.host = exports.isDev = exports.tap = exports.cdurl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var _noRedux = require('no-redux');

var _recompose = require('recompose');

var _selectors = require('./selectors');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cdurl = exports.cdurl = function cdurl(l, c, n) {
  return l.cdVersion ? 'http://res.cloudinary.com/vttc/image/upload/v' + l.cdVersion + '/' + c + '/' + n + '.jpg' : '';
};

var tap = exports.tap = (0, _ramda.tap)(console.log);

var isDev = exports.isDev = function isDev() {
  return process.env.NODE_ENV === 'development';
};

var host = exports.host = isDev() ? 'http://localhost:8080/' : '/';
var api = exports.api = host + 'api/';
var admin = exports.admin = host + 'admin/';

var ml = exports.ml = function ml(p) {
  return function (l) {
    return function (o) {
      return o[p + '_' + l] || o[p];
    };
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
      (0, _ramda.isEmpty)(this.props[f]) && this.props['get' + f[0].toUpperCase() + f.slice(1)](p && _defineProperty({}, p, this.props[p]));
    }
  });
};

var withNewValue = exports.withNewValue = function withNewValue(p, f, v) {
  return (0, _recompose.lifecycle)({
    componentWillReceiveProps: function componentWillReceiveProps(np) {
      var nv = np[p];
      var ov = this.props[p];
      if ((0, _ramda.isNil)(v) ? nv !== ov : nv === v && ov !== v) f(this.props, nv);
    }
  });
};

var withSuccess = exports.withSuccess = function withSuccess(a, f1, f2) {
  return (0, _recompose.compose)((0, _noRedux.connect)((0, _selectors.successSelector)(a)), withNewValue('success', true, f1), withNewValue('success', false, f2));
};

var withLang = exports.withLang = (0, _recompose.withProps)(function (p) {
  return { n: name(p.lang), d: desc(p.lang) };
});

var withDetail = exports.withDetail = function withDetail(o, c) {
  return (0, _recompose.withProps)(function (p) {
    var _ref2;

    return _ref2 = {}, _defineProperty(_ref2, o, (0, _ramda.find)(function (x) {
      return x.id == p.match.params.id;
    }, p[c || o + 's']) || {}), _defineProperty(_ref2, 'id', p.match.params.id), _ref2;
  });
};

var withParams = exports.withParams = (0, _recompose.withProps)(function (p) {
  return _extends({}, p.match.params);
});

var toTitleCase = exports.toTitleCase = function toTitleCase(s) {
  return s.replace(/\w\S*/g, function (t) {
    return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
  });
};