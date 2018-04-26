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
  newProduct: {
    url: _utils.api + 'products',
    path: 'products[]',
    method: 'post'
  },
  product: {
    url: _utils.api + 'products',
    path: 'products[]',
    methods: ['put', 'patch', 'delete']
  },
  product_f: {
    path: 'form.product'
  },
  cats: {
    url: _utils.api + 'cats',
    methods: ['get', 'post']
  },
  cat: {
    url: _utils.api + 'cats',
    path: 'cats[]',
    methods: ['put', 'patch', 'delete']
  },
  cat_f: {
    path: 'form.cat'
  },
  productFilter: {},
  form: {},
  lang: {}
};

exports.default = (0, _noRedux.generateActions)(actionData);