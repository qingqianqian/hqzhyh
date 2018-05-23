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
  player: {
    url: _utils.admin + 'players',
    path: 'players[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  tournaments: {
    url: _utils.api + 'idname/tournaments'
  },
  tournament: {
    url: _utils.admin + 'tournaments',
    path: 'tournaments[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  teams: {
    url: _utils.api + 'tournaments/{id}'
  },
  team: {
    url: _utils.admin + 'teams',
    path: 'teams[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  products: {
    url: _utils.api + 'products'
  },
  product: {
    url: _utils.admin + 'products',
    path: 'products[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  schedules: {
    url: _utils.api + 'schedules'
  },
  schedule: {
    url: _utils.admin + 'schedules',
    path: 'schedules[id]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  history: {
    url: _utils.api + 'playergames/{id}'
  },
  form: {
    path: 'form.{path}'
  },
  filter: {},
  lang: {}
};

exports.default = (0, _noRedux.generateActions)(actionData);