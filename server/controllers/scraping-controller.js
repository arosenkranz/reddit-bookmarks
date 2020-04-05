// https://www.reddit.com/user/Breezerbottles/m/webdev/
const axios = require('axios');
const cheerio = require('cheerio');

const handle = require('../utils/promise-handler');

// scrape reddit and send to front end when GET '/api/scrape' is hit
const scrapeReddit = async (req, res) => {
  const [err, { data }] = await handle(axios.get('https://old.reddit.com/user/Breezerbottles/m/webdev/'));

  if (err) {
    return res.status(500).json(err);
  }

  const $ = cheerio.load(data);
  const posts = [];
  $('p.title').each((i, element) => {
    const postData = {
      title: $(element).text(),
      link: $(element)
        .find('a')
        .attr('href')
    };
    posts.push(postData);
  });
  console.log(posts);
  return res.status(200).json(posts);
};

// export our data
module.exports = {
  scrapeReddit
};
