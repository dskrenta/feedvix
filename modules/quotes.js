'use strict';

const fs = require('fs');
const rand = require('../utils/rand');
const fsAsync = fs.promises;

async function jokes() {
  const quotesJson = await fsAsync.readFile(`${__dirname}/../data/quotes.json`);
  const quotes = JSON.parse(quotesJson);

  const quoteIndexes = new Array(100).fill(0).map(() => rand(0, quotes.length - 1));

  return quoteIndexes.map((index) => {
    return {
      type: 'quote',
      content: quotes[index].text,
      author: quotes[index].author
    }
  });
}

module.exports = jokes;
