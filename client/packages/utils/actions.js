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
  players: {
    url: _utils.api + 'players'
  },
  tournaments: {
    url: _utils.api + 'idname/tournaments'
  },
  tournament: {
    url: _utils.api + 'tournaments/{id}'
  },
  products: {
    url: _utils.api + 'products'
  },
  product: {
    url: _utils.admin + 'products',
    path: 'products[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  cats: {
    url: _utils.api + 'cats'
  },
  cat: {
    url: _utils.admin + 'cats',
    path: 'cats[id]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  form: {
    path: 'form.{path}'
  },
  filter: {},
  lang: {}
};

exports.default = (0, _noRedux.generateActions)(actionData);