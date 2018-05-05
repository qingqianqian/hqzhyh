'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionData = undefined;

var _noRedux = require('no-redux');

var _utils = require('utils');

var actionData = exports.actionData = {
  logout: {
    url: '/logout'
  },
  lookup: {
    url: _utils.api + 'lookup'
  },
  products: {
    url: _utils.api + 'products'
  },
  product: {
    url: _utils.admin + 'products',
    path: 'products[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  product_f: {
    path: 'form.product'
  },
  cats: {
    url: _utils.api + 'cats'
  },
  cat: {
    url: _utils.admin + 'cats',
    path: 'cats[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  cat_f: {
    path: 'form.cat'
  },
  productFilter: {},
  form: {},
  lang: {}
};

exports.default = (0, _noRedux.generateActions)(actionData);