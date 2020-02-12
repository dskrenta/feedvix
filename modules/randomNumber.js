'use strict';

const rand = require('../utils/rand');

async function randomNumber() {
  return [{
    type: 'num',
    num: rand(0, Number.MAX_SAFE_INTEGER)
  }];
}

module.exports = randomNumber;
