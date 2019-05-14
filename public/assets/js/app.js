// get ref to section on page
const $postFeed = $('#post-feed');

// function to GET reddit posts from api
function getRedditPosts() {
  $.ajax({
    url: '/api/scrape',
    method: 'GET'
  })
    .then(printPosts)
    .catch(err => {
      console.log(err);
    });
}

// function to print posts/bookmarks to page
function printPosts(postData) {
  $postFeed.empty();
  postData.forEach(({ title, link }) => {
    if (link.startsWith('/r')) {
      link = `https://reddit.com${link}`;
    }
    $('<li>')
      .data({ title, link })
      .addClass('list-group-item row d-flex align-items-center')
      .append(`<div class='col-12 col-md-8'><a href=${link} target='_blank'>${title}</a></div>`)
      .append(
        `<div class='col text-right'><button class='btn btn-sm btn-outline-danger save-bookmark'>Bookmark this!</button></div>`
      )
      .appendTo($postFeed);
  });
}

getRedditPosts();

function signUp(event) {
  event.preventDefault();

  const userData = {
    firstName: $('#first-name-input')
      .val()
      .trim(),
    lastName: $('#last-name-input')
      .val()
      .trim(),
    email: $('#email-input')
      .val()
      .trim(),
    password: $('#password-input')
      .val()
      .trim()
  };

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    return swal({
      title: "You're missing something!",
      icon: 'error'
    });
  }

  $.ajax({
    url: '/api/user/register',
    method: 'POST',
    data: userData
  })
    .then(function(userData) {
      console.log(userData);
      return swal({
        title: userData.message,
        icon: 'success'
      });
    })
    .then(function() {
      // custom bootstrap method
      $('#signup').tab('hide');
      $('#login').tab('show');
    })
    .catch(err => {
      console.log(err);
      return swal({
        title: err.responseJSON.message,
        icon: 'error'
      });
    });
}

// log user in
function login(event) {
  event.preventDefault();

  const userData = {
    email: $('#email-input-login')
      .val()
      .trim(),
    password: $('#password-input-login')
      .val()
      .trim()
  };

  if (!userData.email || !userData.password) {
    return swal({
      title: "You're missing something!",
      icon: 'error'
    });
  }

  $.ajax({
    url: '/api/user/login',
    method: 'POST',
    data: userData
  })
    .then(function(accessToken) {
      console.log(accessToken);
      localStorage.setItem('accessToken', accessToken);
      getUserProfile();
    })
    .catch(err => {
      console.log(err);
      return swal({
        title: err.responseJSON.error,
        icon: 'error'
      });
    });
}

// log user out
function logout() {
  localStorage.removeItem('accessToken');
  $('#user-info').hide();
  $('#user-tabs, #forms, #right-column-title').show();
  $('#login').tab('show');
}

// get user profile
function getUserProfile() {
  const token = localStorage.getItem('accessToken');

  $.ajax({
    url: '/api/user',
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(function(userData) {
      console.log(userData);
      $('#user-tabs, #forms, #right-column-title').hide();
      $('#user-info').show();
      $('#full-name').text(userData.fullName);
    })
    .catch(err => {
      console.log(err);
      handleError(err.responseJSON);
    });
}

// function to save bookmarks
function saveBookmark() {
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
      icon: 'error'
    });
  }

  // if there's token, make a Post request to create a new bookmark for the user
  $.ajax({
    url: '/api/bookmarks',
    method: 'post',
    data: postData,
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
      handleError(err.responseJSON);
    });
}

function getBookmarks() {
  // retrieve token
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return swal({
      title: 'You have to be logged in!',
      icon: 'error'
    });
  }

  $.ajax({
    url: '/api/bookmarks',
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(function(bookmarkData) {
      console.log(bookmarkData);
      printPosts(bookmarkData.bookmarks);
    })
    .catch(err => {
      console.log(err);
      handleError(err.responseJSON);
    });
}

function handleError(errorData) {
  swal({
    title: 'Please login',
    text: errorData.message,
    icon: 'warning'
  }).then(() => {
    $('#user-info').hide();
    $('#user-tabs, #forms, #right-column-title').show();
    $('#login').tab('show');
  });
}

$(document).ready(function() {
  $('#user-info').hide();
  $('#signup-form').on('submit', signUp);
  $('#login-form').on('submit', login);
  $('#logout').on('click',logout);
  $('#get-bookmarks').on('click', getBookmarks);
  $('#get-posts').on('click', getRedditPosts);
  $postFeed.on('click', '.save-bookmark', saveBookmark);

  const token = localStorage.getItem('accessToken');
  if (token) {
    getUserProfile();
  }
});
