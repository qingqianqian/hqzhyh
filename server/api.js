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

e.count = ip => db.collection('counts')
  .insert({ ip, date: Date.now() })
  .then(x => db.collection('counts').count());

e.initdata = () => Promise.all(
  Object.keys(dbj).map(k => db.collection(k).insertMany(dbj[k]))
);

e.get = doc => db.collection(doc).find().toArray()

module.exports = e;