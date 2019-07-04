'use strict';

const fs = require('fs');
const { promisify } = require('util');

const shuffle = require('../utils/shuffle');

const readFileAsync = promisify(fs.readFile);

const XKCD_IMGS_FILE = './data/xkcdImgUrls.json';

async function xkcd() {
  try {
    const xkcdContent = await readFileAsync(XKCD_IMGS_FILE);
    const xkcdUrls = JSON.parse(xkcdContent);

    return shuffle(xkcdUrls).slice(0, 25).map((imgUrl) => {
      return {
        type: 'img',
        source: 'xkcd',
        url: imgUrl
      };
    });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = xkcd;
