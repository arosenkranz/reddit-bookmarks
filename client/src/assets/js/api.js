import swal from 'sweetalert';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';

import printPosts from './print-handlers';

export function handleError(errorData) {
  swal({
    title: 'Please login',
    text: errorData.message,
    icon: 'warning',
  }).then(() => {
    $('#user-info').hide();
    $('#user-tabs, #forms, #right-column-title').show();
    $('#login').tab('show');
  });
}

// function to GET reddit posts from api
export function getRedditPosts() {
  $.ajax({
    url: '/api/scrape',
    method: 'GET',
  })
    .then(printPosts)
    .catch((err) => {
      console.log(err);
    });
}

// get user profile
export function getUserProfile() {
  const token = localStorage.getItem('accessToken');

  $.ajax({
    url: '/api/user',
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(function(userData) {
      console.log(userData);
      $('#user-tabs, #forms, #right-column-title').hide();
      $('#user-info').show();
      $('#full-name').text(userData.fullName);
    })
    .catch((err) => {
      console.log(err);
      handleError(err.responseJSON);
    });
}

// function to save bookmarks
export function saveBookmark() {
  // get information from <li> that this button lives in (the parent)
  const postData = $(this)
    .parent()
    .parent()
    .data();

  // get access token from localStorage
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return swal({
      title: 'You need to be logged in to do this!',
      icon: 'error',
    });
  }

  // if there's token, make a Post request to create a new bookmark for the user
  $.ajax({
    url: '/api/bookmarks',
    method: 'post',
    data: postData,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
      handleError(err.responseJSON);
    });
}

export function getBookmarks() {
  // retrieve token
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return swal({
      title: 'You have to be logged in!',
      icon: 'error',
    });
  }

  $.ajax({
    url: '/api/bookmarks',
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(function(bookmarkData) {
      console.log(bookmarkData);
      printPosts(bookmarkData.bookmarks);
    })
    .catch((err) => {
      console.log(err);
      handleError(err.responseJSON);
    });
}
