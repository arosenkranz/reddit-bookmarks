// this file collects the other routes and provides the endpoint names
const router = require('express').Router();
const userRoutes = require('./user-routes');
const bookmarkRoutes = require('./bookmark-routes');
const scrapeRoutes = require('./scrape-routes');

// prepend endpoints
router.use('/user', userRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/scrape', scrapeRoutes);

module.exports = router;