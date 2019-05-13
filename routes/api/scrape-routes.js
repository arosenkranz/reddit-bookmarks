const router = require('express').Router();

const {scrapeReddit} = require("../../controllers/scraping-controller");

// GET route to match '/api/scrape'
router
  .route('/')
  .get(scrapeReddit);

module.exports = router;
