// use this file to collect ALL routes (api and HTML) and package them
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send("404!"));

module.exports = router;
