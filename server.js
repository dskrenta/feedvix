'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { promisify } = require('util');
const fetch = require('node-fetch');

const swansonQuotes = require('./data/swansonQuotes');

const PORT = 3000;
const XKCD_IMGS_FILE = './data/xkcdImgUrls.json';
const NEWS_FILE = './data/news.json';
const JSERVICE_API_ENDPOINT = 'http://jservice.io/api/random?count=100';

const readFileAsync = promisify(fs.readFile);

const app = express();
app.use(cors());

app.use(express.static('public'))

app.get('/', async (req, res) => {
  try {
    res.sendFile(`${__dirname}/index.html`);
  }
  catch (error) {
    console.error(error);
  }
});

app.get('/api', async (req, res) => {
  try {
    const results = [];

    const xkcdContent = await readFileAsync(XKCD_IMGS_FILE);
    const xkcdUrls = JSON.parse(xkcdContent);

    shuffle(xkcdUrls).slice(0, 25).forEach((imgUrl) => {
      results.push({
        type: 'img',
        url: imgUrl
      });
    });

    results.push({
      type: 'num',
      num: rand(0, Number.MAX_SAFE_INTEGER)
    });

    results.push({
      type: 'text',
      text: `${swansonQuotes[rand(0, swansonQuotes.length - 1)]} - Ron Swanson`
    });

    const buzzWordRes = await fetch('https://corporatebs-generator.sameerkumar.website/');
    const buzzWordObj = await buzzWordRes.json();

    results.push({
      type: 'text',
      text: buzzWordObj.phrase
    });

    const newsContent = await readFileAsync(NEWS_FILE);
    const newsObj = await JSON.parse(newsContent);

    for (let article of newsObj.articles) {
      results.push({
        type: 'article',
        source: article.source,
        aurthor: article.aurthor,
        title: article.title,
        url: article.url,
        image: article.urlToImage,
        createdAt: article.publishedAt,
        content: article.content
      });
    }

    const jserviceResults = await fetch(JSERVICE_API_ENDPOINT);
    const jserviceObj = await jserviceResults.json();

    for (let question of jserviceObj) {
      results.push({
        type: 'trivia',
        question: question.question,
        answer: question.answer,
        value: question.value
      });
    }

    res.json(shuffle(results));
  }
  catch (error) {
    console.error(error);
  }
});

app.listen(
  PORT,
  () => console.log(`Feedvix server listening on port: ${PORT}`)
);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}

function rand(
  min = 0,
  max = 1,
  int = true
) {
  if (int) {
    min = Math.ceil(min);
    max = Math.floor(max);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
