'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.initdata = exports.count = exports.initdb = undefined;

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let db = null;

const initdb = exports.initdb = mongoURL => {
  if (db || mongoURL == null) return;

  _mongodb2.default.connect(mongoURL).then(conn => {
    db = conn;
    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

const count = exports.count = ip => db.collection('counts').insert({ ip, date: Date.now() }).then(x => db.collection('counts').count());

const initdata = exports.initdata = () => Promise.all(Object.keys(_db2.default).map(k => db.collection(k).insertMany(_db2.default[k])));

const get = exports.get = doc => db.collection(doc).find().toArray();