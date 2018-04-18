const mongodb = require('mongodb');
const dbj = require('./db');
const { tap } = require('./utils');

let db = null;
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

e.list = () => db.getCollectionNames()

e.get = doc => db.collection(doc).find().toArray()

e.getById = (doc, id) => db.collection(doc).findOne({ id: +id })

e.add = (doc, obj) => db.collection(doc).insert(obj)

e.drop = doc => db.collection(doc).drop()

module.exports = e;