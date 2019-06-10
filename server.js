'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { promisify } = require('util');

const PORT = 3000;
const XKCD_IMGS_FILE = './data/xkcdImgUrls.json';

const readFileAsync = promisify(fs.readFile);

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const results = [];

    const xkcdContent = await readFileAsync(XKCD_IMGS_FILE);
    const xkcdUrls = JSON.parse(xkcdContent);

    shuffle(xkcdUrls).slice(0, 10).forEach((imgUrl) => {
      results.push({
        type: 'img',
        url: imgUrl
      });
    })

    results.push({
      type: 'num',
      num: rand(0, Number.MAX_SAFE_INTEGER)
    });

    res.json(results);
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
