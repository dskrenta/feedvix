'use strict';

const elementsArr = require('../data/elements');
const shuffle = require('../utils/shuffle');

async function elements() {
  const shuffled = shuffle(elementsArr);
  return [
    {
      type: 'element',
      content: shuffled.pop(),
      source: 'Wikipedia'
    },
    {
      type: 'element',
      content: shuffled.pop(),
      source: 'Wikipedia'
    },
    {
      type: 'element',
      content: shuffled.pop(),
      source: 'Wikipedia'
    },
    {
      type: 'element',
      content: shuffled.pop(),
      source: 'Wikipedia'
    },
    {
      type: 'element',
      content: shuffled.pop(),
      source: 'Wikipedia'
    },
  ];
}

module.exports = elements;