const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api');
const { tap, done, send, config, cors, nocache, port, ip, mongoURL, secret, username, password, gotoLogin } = require('./utils');

const app = express();

if (!process.env.DATABASE_SERVICE_NAME)
    app.use(cors);

api.initdb(mongoURL);

app.use(express.static('client/packages/vttc/build'));
app.use(express.static('client/packages/admin/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  api.initdb(mongoURL);
  next();
});

// get --------------------

app.get('/api/lookup', (req, res) => {
  send(
    Promise.all([api.cdVersion(), api.get('cats')])
      .then(r => ({ cdVersion: r[0], cats: r[1] })),
    res
  );
});

app.get('/api/:doc/:id', (req, res) => {
  const { doc, id } = req.params;
  send(api.getById(doc, id), res);
});

app.get('/api/:doc', (req, res) => {
  send(api.get(req.params.doc), res);
});

// admin --------------------

app.get('/login', nocache, (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  if (username != req.body.username || password != req.body.password) {
    gotoLogin(res);
  } else {
    const token = jwt.sign({}, secret, { expiresIn: '24h' });
    res.cookie('vttc_token', token);
    res.redirect('/admin');
  }
});

app.get('/logout', (req, res) => {
  gotoLogin(res);
});

app.use('/admin', (req, res, next) => {
  const token = req.cookies.vttc_token;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        gotoLogin(res);
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    gotoLogin(res);
  }
});

app.get('/admin/initdata', (req, res) => {
  done(api.initdata(), res);
});

app.get('/admin/initacc', (req, res) => {
  done(api.initacc(), res);
});

app.get('/admin/env', (req, res) => {
  res.send(Object.keys(process.env).sort());
});

app.get('/admin/cd/list', (req, res) => {
  send(api.cdList(), res);
});

app.get('/admin/count/:doc', (req, res) => {
  send(api.count(req.params.doc), res);
});

app.post('/admin/:doc', (req, res) => {
  send(api.add(req.params.doc, req.body), res);
});

app.put('/admin/:doc', (req, res) => {
  send(api.replace(req.params.doc, req.body), res);
});

app.put('/admin/:doc', (req, res) => {
  send(api.replace(req.params.doc, req.body), res);
});

app.purge('/admin/:doc', (req, res) => {
  done(api.drop(req.params.doc), res);
});

// catch all --------------------

app.get('/admin/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/packages/admin/build/index.html'))
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/packages/vttc/build/index.html'))
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
