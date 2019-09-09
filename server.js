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
const shuffle = require('./utils/shuffle');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

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
      ...await buzzWord(),
      ...await jService(),
      ...await newsApi(),
      ...randomNumber(),
      ...swansonQuotes(),
      ...await xkcd(),
      ...await wiki(),
      ...await adviceSlip()
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
