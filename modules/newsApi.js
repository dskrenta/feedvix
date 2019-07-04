'use strict';

const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const NEWS_FILE = './data/news.json';

async function newsApi() {
  try {
    const newsContent = await readFileAsync(NEWS_FILE);
    const newsObj = await JSON.parse(newsContent);

    return newsObj.articles.map(article => {
      return {
        type: 'article',
        source: article.source,
        aurthor: article.aurthor,
        title: article.title,
        url: article.url,
        image: article.urlToImage,
        createdAt: article.publishedAt,
        content: article.content
      };
    });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = newsApi;
