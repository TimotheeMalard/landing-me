'use strict';

const app = require('express')();

const configs = require('./configs');

require('./services/express')(app);

// eslint-disable-next-line no-console
console.log('> Starting app ...');
app.listen(configs.port, () => {
  // eslint-disable-next-line no-console
  console.log(`> App listens on ${configs.host}:${configs.port} !`);
});
