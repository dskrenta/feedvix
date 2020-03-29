'use strict';

const elementsArr = require('../data/elements');
const shuffle = require('../utils/shuffle');

async function elements() {
  const shuffled = shuffle(elementsArr);
  return [
    {
      type: 'element',
      content: shuffled.pop()
    },
    {
      type: 'element',
      content: shuffled.pop()
    },
    {
      type: 'element',
      content: shuffled.pop()
    },
    {
      type: 'element',
      content: shuffled.pop()
    },
    {
      type: 'element',
      content: shuffled.pop()
    },
  ];
}

module.exports = elements;