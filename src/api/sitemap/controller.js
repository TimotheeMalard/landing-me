'use strict';

const sm = require('sitemap');

const configs = require('../../configs');

const sitemap = sm.createSitemap({
  hostname: configs.url,
  cacheTime: 600000,
  urls: [
    { url: '/contact-us' },
    { url: '/jobs' },
    { url: '/tos' },
    { url: '/privacy' },
  ],
});

function xml(req, res) {
  sitemap.toXML((err, _xml) => {
    if (err) {
      return res.status(500).end();
    }

    res.header('Content-Type', 'application/xml');
    return res.send(_xml);
  });
}

module.exports = {
  xml,
};
