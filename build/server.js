'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let db = null;
const app = (0, _express2.default)();

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || 'mongodb://localhost:27017/vttc';
let mongoURLLabel = "";

if (process.env.DATABASE_SERVICE_NAME) {
  const mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
  const mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
  const mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
  const mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
  const mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
  const mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
  }
}

const initDb = fn => {
  if (db || mongoURL == null) return;

  _mongodb2.default.connect(mongoURL).then(conn => {
    db = conn;
    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

initDb();

app.use(_express2.default.static('client/build'));
app.use((req, res, next) => {
  initDb();
  next();
});
app.use((0, _morgan2.default)('combined'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.get('/pagecount', (req, res) => {
  const col = db.collection('counts');
  col.insert({ ip: req.ip, date: Date.now() });
  col.count().then(count => res.send('{ pageHit: ' + count + '}'));
});

app.get('*', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, '../client/build/index.html'));
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);