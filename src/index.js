'use strict';

const app = require('express')();

const configs = require('./configs');

require('./services/express')(app);

console.log('> Starting app ...');
app.listen(configs.port, () => {
  console.log(`> App listens on ${configs.host}:${configs.port} !`);
});
