const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');
const cd = require('cloudinary');
const { sortWith, ascend, descend, prop } = require('ramda');
const config = fs.existsSync(path.join(__dirname, 'config.js')) ? require('./config') : null;
const dbj = require('./db');
const { tap } = require('./utils');

let db = null;
if (config) cd.config({ cloud_name: 'vttc', api_key: config.cloudinary_key, api_secret: config.cloudinary_secret });
const e = {};

e.initdb = mongoURL => {
  if (db || mongoURL == null) return;

  mongodb.connect(mongoURL).then(conn => {
    db = conn;
    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

e.initdata = () => Promise.all(
  Object.keys(dbj).map(k => db.collection(k).insertMany(dbj[k]))
);

e.list = () => Object.keys(db)

e.get = doc => db.collection(doc).find({}, { _id: 0 }).toArray()

e.getById = (doc, id) => db.collection(doc).findOne({ id: +id }, { _id: 0 })

e.add = (doc, obj) => db.collection(doc).insert(obj)

e.drop = doc => db.collection(doc).drop()

e.cdList = () => cd.v2.api.resources({ max_results: 500 }).then(r => sortWith([ascend(prop('public_id'))], r.resources))

e.cdVersion = () => cd.v2.api.resources({ max_results: 500 }).then(r => sortWith([descend(prop('version'))], r.resources)[0].version)

module.exports = e;
