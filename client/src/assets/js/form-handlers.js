// import dependencies
import $ from 'jquery';
import swal from 'sweetalert';
import 'popper.js';

import 'bootstrap';
import { getUserProfile } from './api';

export function signUp(event) {
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
      .trim(),
  };

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    return swal({
      title: "You're missing something!",
      icon: 'error',
    });
  }

  $.ajax({
    url: '/api/user/register',
    method: 'POST',
    data: userData,
  })
    .then(function(userData) {
      console.log(userData);
      return swal({
        title: userData.message,
        icon: 'success',
      });
    })
    .then(function() {
      // custom bootstrap method
      $('#signup').tab('hide');
      $('#login').tab('show');
    })
    .catch((err) => {
      console.log(err);
      return swal({
        title: err.responseJSON.message,
        icon: 'error',
      });
    });
}

// log user in
export function login(event) {
  event.preventDefault();

  const userData = {
    email: $('#email-input-login')
      .val()
      .trim(),
    password: $('#password-input-login')
      .val()
      .trim(),
  };

  if (!userData.email || !userData.password) {
    return swal({
      title: "You're missing something!",
      icon: 'error',
    });
  }

  $.ajax({
    url: '/api/user/login',
    method: 'POST',
    data: userData,
  })
    .then(function(accessToken) {
      console.log(accessToken);
      localStorage.setItem('accessToken', accessToken);
      getUserProfile();
    })
    .catch((err) => {
      console.log(err);
      return swal({
        title: err.responseJSON.error,
        icon: 'error',
      });
    });
}

// log user out
export function logout() {
  localStorage.removeItem('accessToken');
  $('#user-info').hide();
  $('#user-tabs, #forms, #right-column-title').show();
  $('#login').tab('show');
}
