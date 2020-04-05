import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import { logout, login, signUp } from './assets/js/form-handlers';
import { getBookmarks, getRedditPosts, getUserProfile, saveBookmark } from './assets/js/api';

import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// get ref to section on page
const $postFeed = $('#post-feed');

getRedditPosts();

$(document).ready(function onReady() {
  $('#user-info').hide();
  $('#signup-form').on('submit', signUp);
  $('#login-form').on('submit', login);
  $('#logout').on('click', logout);
  $('#get-bookmarks').on('click', getBookmarks);
  $('#get-posts').on('click', getRedditPosts);
  $postFeed.on('click', '.save-bookmark', saveBookmark);

  const token = localStorage.getItem('accessToken');
  if (token) {
    getUserProfile();
  }
});
