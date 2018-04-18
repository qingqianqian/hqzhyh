const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');
const { done, send } = require('./utils');

const app = express();

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || 'mongodb+srv://ln613:ln-750613@cluster0-drvhn.mongodb.net/test';
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
else {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  });
}

api.initdb(mongoURL);

app.use(express.static('client/build'));
app.use(app.use(bodyParser.json()));
app.use((req, res, next) => {
  api.initdb(mongoURL);
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

// get --------------------

app.get('/api/initdata', (req, res) => {
  done(api.initdata(), res);
});

app.get('/api/:doc/:id', (req, res) => {
  const { doc, id } = req.params;
  send(api.getById(doc, id), res);
});

app.get('/api/:doc', (req, res) => {
  send(api.get(req.params.doc), res);
});

// post --------------------

app.post('/api/drop', (req, res) => {
    res.send(req.body);
  //done(api.drop(req.body.doc), res);
});

app.post('/api/:doc', (req, res) => {
  send(api.add(req.params.doc, req.body), res);
});

// catch all --------------------

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
