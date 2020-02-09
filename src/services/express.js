'use strict';

const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const csp = require('helmet-csp');

const api = require('../api');

const distPath = './dist';
const devPath = './client';
const clientPath = (process.env.NODE_ENV === 'local' ? devPath : distPath);

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== 'local') {
    return res.redirect(`https://${req.get('host')}${req.url}`);
  }
  return next();
}

function shouldCompress(req, res) {
  return !!res.get('Content-Type');
}

module.exports = app => {
  app.use(compression({ filter: shouldCompress }));
  app.use(requireHTTPS);

  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(csp({
    directives: {
      defaultSrc: [
        "'self'",
        'creanetis.com',
      ],
      fontSrc: [
        "'self'",
        'data:',
      ],
      styleSrc: [
        "'unsafe-inline'",
        "'self'",
        'stackpath.bootstrapcdn.com',
      ],
      imgSrc: [
        "'self'",
        'data:',
      ],
      scriptSrc: [
        "'self'",
        'code.jquery.com',
        'stackpath.bootstrapcdn.com',
      ],
    },
  }));

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // Robots.txt file
  app.use('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow:');
  });

  app.use('/styles', express.static(`${clientPath}/styles`));
  app.use('/scripts', express.static(`${clientPath}/scripts`));
  app.use('/images', express.static(`${clientPath}/images`));

  app.set('views', `${clientPath}/views`);
  app.set('view engine', 'pug');

  app.use(api());
  app.use((req, res) => {
    res.status(404).render('index');
  });
};
