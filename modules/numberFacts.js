'use strict';

const fetch = require('node-fetch');

const FACTS_API_ENDPOINT = 'http://numbersapi.com/random/trivia';

async function numberFacts() {
  try {
    let factsArr = [];

    for (let i = 0; i < 5; i++) {
      const factsResults = await fetch(FACTS_API_ENDPOINT);
      const factsObj = await factsResults.json();
      factsArr.push(factsObj);
    }

    console.log(factsArr)

    return factsArr.map(fact => {
      return {
        type: 'text',
        text: fact
      };
    });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = numberFacts;
