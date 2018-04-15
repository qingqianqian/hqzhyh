import mongodb from 'mongodb';
import dbj from './db';
import { tap } from './utils';

let db = null;

export const initdb = mongoURL => {
  if (db || mongoURL == null) return;

  mongodb.connect(mongoURL).then(conn => {
    db = conn;
    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

export const count = ip => db.collection('counts')
  .insert({ ip, date: Date.now() })
  .then(x => db.collection('counts').count());

export const initdata = () => Promise.all(
  Object.keys(dbj).map(k => db.collection(k).insertMany(dbj[k]))
);

export const get = doc => db.collection(doc).find().toArray()