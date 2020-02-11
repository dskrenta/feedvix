'use strict';

const swansonQuotesArr = require('../data/swansonQuotes');
const rand = require('../utils/rand');

async function swansonQuotes() {
  return [{
    type: 'quote',
    content: swansonQuotesArr[rand(0, swansonQuotesArr.length - 1)],
    author: 'Ron Swanson'
  }];
}

module.exports = swansonQuotes;
