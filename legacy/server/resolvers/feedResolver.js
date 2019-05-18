'use strict';

const fetch = require('node-fetch');

const { TRUSTED_NEWS_SOURCES } = require('../utils/constants');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: `${__dirname}/../../.env`});
}

async function feedResolver() {
  try {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS_API_KEY}&sources=${TRUSTED_NEWS_SOURCES}`);
    const data = await res.json();

    const results = data.articles.map(article => {
      return {
        title: article.title,
        author: article.author,
        createdAt: article.publishedAt,
        url: article.url,
        description: article.description,
        imageUrl: article.urlToImage,
        content: article.content,
        source: article.source.name
      };
    })

    return {
      total: results.length,
      results: results
    };
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = feedResolver;
