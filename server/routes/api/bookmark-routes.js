const router = require('express').Router();

// import methods I exported from bookmarks-controller
const { getBookmarks, createBookmark } = require('../../controllers/bookmark-controller');

const withAuth = require('../../middleware/authentication');

// set up withAuth as router-level middleware
router.use(withAuth);

// create GET and POST route that matches '/api/bookmarks'
router
  .route('/')
  .get(getBookmarks)
  .post(createBookmark);

module.exports = router;
