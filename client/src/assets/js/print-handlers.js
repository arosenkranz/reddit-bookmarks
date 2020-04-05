import $ from 'jquery';

// function to print posts/bookmarks to page
function printPosts(postData) {
  const $postFeed = $('#post-feed');
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

export default printPosts;
