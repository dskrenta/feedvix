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
const makeIterable = require('./utils/makeIterable');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.static('public'));

async function init() {
  try {
    await scheduleNewsUpdate();
  }
  catch (error) {
    console.error(error);
  }
}

init();

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
    const results = [
      ...makeIterable(await buzzWord()),
      ...makeIterable(await jService()),
      ...makeIterable(await newsApi()),
      ...makeIterable(randomNumber()),
      ...makeIterable(swansonQuotes()),
      ...makeIterable(await xkcd()),
      ...makeIterable(await wiki()),
      ...makeIterable(await adviceSlip()),
      ...makeIterable(jokes())
    ];
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
