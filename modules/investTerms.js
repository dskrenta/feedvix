'use strict';

const termsArr = require('../data/investTerms');
const rand = require('../utils/rand');

async function investTerms() {
  return [
    {
      type: 'investTerm',
      content: termsArr[rand(0, termsArr.length - 1)],
      source: 'Investopedia'
    },
    {
      type: 'investTerm',
      content: termsArr[rand(0, termsArr.length - 1)],
      source: 'Investopedia'
    },
    {
      type: 'investTerm',
      content: termsArr[rand(0, termsArr.length - 1)],
      source: 'Investopedia'
    },
    {
      type: 'investTerm',
      content: termsArr[rand(0, termsArr.length - 1)],
      source: 'Investopedia'
    },
    {
      type: 'investTerm',
      content: termsArr[rand(0, termsArr.length - 1)],
      source: 'Investopedia'
    },
  ];
}

module.exports = investTerms;
