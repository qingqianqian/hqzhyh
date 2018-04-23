'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionData = undefined;

var _noRedux = require('no-redux');

var _utils = require('utils');

var actionData = exports.actionData = {
  lookup: {
    url: _utils.api + 'lookup'
  },
  products: {
    url: _utils.api + 'products'
  },
  productFilter: {}
};

exports.default = (0, _noRedux.generateActions)(actionData);