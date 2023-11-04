const express = require('express');
const docsRoute = require('./docs.route');
const searchRoute = require('./search.route');
const rankingRoute = require('./ranking.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path:'/search',
    route: searchRoute
  },
  {
    path:'/ranking',
    route:rankingRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
