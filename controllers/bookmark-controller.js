/* eslint-disable no-underscore-dangle */
const { User } = require('../models');
const handle = require('../utils/promise-handler');

// GET bookmarks '/api/bookmarks' for a user
const getBookmarks = async (req, res) => {
  const [userErr, bookmarkData] = await handle(User.findById(req._id, 'bookmarks'));

  if (userErr) {
    return res.json(500).json(userErr);
  }

  return res.status(200).json(bookmarkData);
};

// CREATE/POST bookmark for a user '/api/bookmarks'
const createBookmark = async (req, res) => {
  const [userFindErr, userProfile] = await handle(User.findById(req._id));

  if (userFindErr) {
    return res.status(500).json(userFindErr);
  }

  // create new bookmark based on user using subdocuments
  const newBookmark = userProfile.bookmarks.create(req.body);

  User.findOneAndUpdate(
    {
      _id: req._id,
      'bookmarks.link': {
        $ne: req.body.link
      }
    },
    {
      $addToSet: { bookmarks: newBookmark }
    },
    {
      new: true
    }
  )
    .then(userInfo => {

      if (userInfo !== null) {
        res.json(userInfo);
      }
      else {
        res.json({
          message: "Link already saved"
        });
      }

    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
};

module.exports = {
  createBookmark,
  getBookmarks
};
