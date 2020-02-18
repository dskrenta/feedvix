'use strict';

const fs = require('fs');
const { promisify } = require('util');
const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: `${__dirname}/../.env`});
}

const { SECONDS_BEFORE_NEWS_UPDATE } = require('../utils/constants');
const timeDifference = require('../utils/timeDifference');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const API_ENDPOINT = `https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=${process.env.NEWS_API_KEY}&sources=abc-news,ars-technica,associated-press,bbc-news,bloomberg,business-insider,cbs-news,cnbc,cnn,engadget,financial-times,fortune,google-news,hacker-news,mashable,msnbc,national-geographic,national-review,nbc-news,new-scientist,newsweek,new-york-magazine,politico,recode,reddit-r-all,reuters,techcrunch,the-hill,the-huffington-post,the-new-york-times,the-next-web,the-telegraph,the-verge,the-wall-street-journal,the-washington-post,the-washington-times,time,usa-today,wired`;
const NEWS_FILE = './data/news.json';

async function newsApi() {
  try {
    const newsContent = await readFileAsync(NEWS_FILE);
    const newsObj = JSON.parse(newsContent);

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

async function updateNews() {
  try {
    console.log('Updating news...');
    const newsRes = await fetch(API_ENDPOINT);
    const newsJson = await newsRes.json();
    const updatedNews = { lastFetched: new Date(), ...newsJson };
    await writeFileAsync(NEWS_FILE, JSON.stringify(updatedNews));

    scheduleNewsUpdate();
  }
  catch (error) {
    console.error(error);
  }
}

async function scheduleNewsUpdate() {
  try {
    const newsContent = await readFileAsync(NEWS_FILE, 'utf-8');
    const newsObj = JSON.parse(newsContent);
    const lastFetchedDiffInSeconds = timeDifference(new Date(), new Date(newsObj.lastFetched));

    if (lastFetchedDiffInSeconds >= SECONDS_BEFORE_NEWS_UPDATE) {
      updateNews();
    }
    else {
      const millsToUpdate = (SECONDS_BEFORE_NEWS_UPDATE - lastFetchedDiffInSeconds) * 1000;
      console.log(`Updating news in ${millsToUpdate} milliseconds`);

      setTimeout(() => {
        updateNews();
      }, millsToUpdate);
    }
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = {
  newsApi,
  scheduleNewsUpdate
};
