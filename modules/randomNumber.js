'use strict';

const rand = require('../utils/rand');

function randomNumber() {
  return [{
    type: 'text',
    text: rand(0, Number.MAX_SAFE_INTEGER)
  }];
}

module.exports = randomNumber;
