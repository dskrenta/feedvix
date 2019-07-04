'use strict';

const express = require('express');
const cors = require('cors');

const buzzWord = require('./modules/buzzWord');
const jService = require('./modules/jService');
const newsApi = require('./modules/newsApi');
const randomNumber = require('./modules/randomNumber');
const swansonQuotes = require('./modules/swansonQuotes');
const xkcd = require('./modules/xkcd');
const shuffle = require('./utils/shuffle');

const PORT = 3000;

const app = express();
app.use(cors());

app.use(express.static('public'));

// on server startup schedule next news fetch function
// read file
// get last timestamp

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
      ...await xkcd()
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
