'use strict';

const express = require('express');

const sitemap = require('./sitemap/controller');

const router = express.Router();


module.exports = router;

module.exports = () => {
  router.get('/', (req, res) => { res.render('talent'); });
  router.get('/account', (req, res) => { res.render('account'); });
  router.get('/company', (req, res) => { res.render('company'); });
  router.get('/contact', (req, res) => { res.render('contact'); });

  router.get('/sitemap.xml', sitemap.xml);

  router.get('*', (req, res) => { res.render('not_found'); });
  return router;
};
