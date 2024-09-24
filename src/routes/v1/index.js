const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route')
const activityRoute = require('./activity.route');
const chatRoute = require('./chat.route');
const cmsRoute = require('./cms.route');
const connectionRoute = require('./connection.route');
const reviewRoute = require('./review.route');
const subscriptionRoute = require('./subscription.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/api',
    route:activityRoute

  },
  {
    path: '/connection',
    route:connectionRoute

  }
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
