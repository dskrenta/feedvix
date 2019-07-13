'use strict';

const fetch = require('node-fetch');

const FACT_API = 'http://randomuselessfact.appspot.com/random.json?language=en';
const FACT_COUNT = 5;

async function fact() {
  try {
    const results = [];

    for (let i = 0; i < FACT_COUNT; i++) {
      const res = await fetch(FACT_API);
      const factObj = await res.json();

      results.push({
        type: 'text',
        text: factObj.text
      });
    }

    return results;
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = fact;
