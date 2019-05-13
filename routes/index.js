// use this file to collect ALL routes (api and HTML) and package them
const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

router.use('/api', apiRoutes);

router.use((req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

module.exports = router;
