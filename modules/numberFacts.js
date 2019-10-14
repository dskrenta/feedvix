'use strict';

const fetch = require('node-fetch');

const getEndpoint = (nums) => `http://numbersapi.com/${[...new Set(nums)].join(',')}/trivia?notfound=floor`;

async function numberFacts() {
  try {
    let nums = [];

    for (let i = 0; i < 25; i++) {
      const rand = Math.floor((Math.random() * 10000));
      nums.push(rand);
    }
    
    const endpoint = getEndpoint(nums);
    const res = await fetch(endpoint);
    const resJSON = await res.json();

    const factArray = Object.values(resJSON);
    return factArray.map(fact => {
      return {
        type: 'fact',
        fact
      };
    });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = numberFacts;
