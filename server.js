'use strict';

const express = require('express');
const cors = require('cors');

const buzzWord = require('./modules/buzzWord');
const jService = require('./modules/jService');
const { newsApi, scheduleNewsUpdate } = require('./modules/newsApi');
const randomNumber = require('./modules/randomNumber');
const swansonQuotes = require('./modules/swansonQuotes');
const xkcd = require('./modules/xkcd');
const wiki = require('./modules/wiki');
const adviceSlip = require('./modules/adviceSlip');
const jokes = require('./modules/jokes');
const shuffle = require('./utils/shuffle');

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
  wiki,
  adviceSlip,
  jokes
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
    console.error(error);
  }
});

app.listen(
  PORT,
  () => console.log(`Feedvix server listening on port: ${PORT}`)
);
