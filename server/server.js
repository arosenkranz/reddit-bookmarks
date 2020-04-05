const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// set up app
const app = express();
const PORT = process.env.PORT || 3001;

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// set up database info
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/reddit-bookmarks';
mongoose.Promise = Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
});

// set up routes
const routes = require('./routes');

app.use(routes);

app.listen(PORT, () => console.log(`🗺️ => now listening on http://localhost:${PORT}`));
