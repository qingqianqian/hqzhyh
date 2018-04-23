const R = require('ramda');

const e = {};

e.cd = 'http://res.cloudinary.com/vttc/image/upload/v1522908408/';

e.tap = R.tap(console.log);

const send = d => (p, res) => p.then(x => res.json(d || x)).catch(e => res.send(e))

e.done = send('done')

e.send = send()

module.exports = e;