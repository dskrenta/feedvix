'use strict';

const rand = require('../utils/rand');

function swansonQuotes() {
  return [{
    type: 'text',
    text: `${swansonQuotes[rand(0, swansonQuotes.length - 1)]} - Ron Swanson`
  }];
}

module.exports = swansonQuotes;
