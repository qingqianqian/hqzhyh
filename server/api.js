const fs = require('fs');
const mongodb = require('mongodb');
const cd = require('cloudinary');
const { sortWith, ascend, descend, prop } = require('ramda');
const { tap, config } = require('./utils');

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

e.initdocs = docs => {
  const f = k => r => db.collection(k).insertMany(docs[k]);
  return Promise.all(
    Object.keys(docs).map(k => db.collection(k).drop().then(f(k)).catch(f(k)))
  );
}

e.initdata = () => e.initdocs(require('../data/db'))

e.initacc = () => e.initdocs(JSON.parse(fs.readFileSync('./data/1.json')))

e.list = () => Object.keys(db)

e.count = doc => db.collection(doc).count()

e.get = doc => db.collection(doc).find({}, { _id: 0 }).toArray()

e.getIdName = doc => db.collection(doc).find({}, { _id: 0, id: 1, name: 1 }).toArray()

e.getById = (doc, id) => db.collection(doc).findOne({ id: +id }, { _id: 0 })

e.add = (doc, obj) => db.collection(doc).count().then(r => db.collection(doc).insert(Object.assign({}, obj, { id: r + 1})))

e.replace = (doc, obj) => db.collection(doc).replaceOne({ id: obj.id }, obj)

e.delete = (doc, obj) => db.collection(doc).remove({ id: obj.id })

e.drop = doc => db.collection(doc).drop()

e.cdList = () => cd.v2.api.resources({ max_results: 500 }).then(r => sortWith([ascend(prop('public_id'))], r.resources))

e.cdVersion = () => cd.v2.api.resources({ max_results: 500 }).then(r => sortWith([descend(prop('version'))], r.resources)[0].version)

module.exports = e;
