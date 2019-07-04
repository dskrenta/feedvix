'use strict';

const fetch = require('node-fetch');

const BUZZ_WORD_API = 'https://corporatebs-generator.sameerkumar.website/';

async function buzzWord() {
  try {
    const buzzWordRes = await fetch(BUZZ_WORD_API);
    const buzzWordObj = await buzzWordRes.json();

    return [{
      type: 'text',
      text: buzzWordObj.phrase
    }];
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = buzzWord;
