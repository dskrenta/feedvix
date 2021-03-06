'use strict';

const express = require('express');
const cors = require('cors');

const buzzWord = require('./modules/buzzWord');
const jService = require('./modules/jService');
const { newsApi, scheduleNewsUpdate } = require('./modules/newsApi');
const randomNumber = require('./modules/randomNumber');
const swansonQuotes = require('./modules/swansonQuotes');
const xkcd = require('./modules/xkcd');
const wikiModule = require('./modules/wiki');
const adviceSlip = require('./modules/adviceSlip');
const jokes = require('./modules/jokes');
const shuffle = require('./utils/shuffle');
const quotes = require('./modules/quotes');
const elements = require('./modules/elements');
const investTerms = require('./modules/investTerms');
const getPdf = require('./utils/getPdf');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.static('public'));

const modules = [
  buzzWord,
  jService,
  newsApi,
  randomNumber,
  swansonQuotes,
  xkcd,
  wikiModule,
  adviceSlip,
  jokes,
  quotes,
  elements,
  investTerms
];

async function init() {
  try {
    await scheduleNewsUpdate();
  }
  catch (error) {
    console.error(error);
  }
}

init();

app.get('/api', async (req, res) => {
  try {
    let results = [];

    for (const func of modules) {
      try {
        results = [...results, ...await func()];
      }
      catch (error) {
        console.error(`Module error: ${func.name}`, error);
      }
    }

    res.json(shuffle(results));
  }
  catch (error) {
    console.error('api error', error);
  }
});

app.get('/pdf', async (req, res) => {
  try {
    const pdf = await getPdf();
    res.type('arrayBuffer');
    res.set('Accept', 'application/pdf');
    res.send(pdf);
  }
  catch (error) {
    console.error('pdf error', error);
  }
});

app.listen(
  PORT,
  () => console.log(`Feedvix server listening on port: ${PORT}`)
);
