'use strict';

const fetch = require('node-fetch');

const ADVICE_API = 'https://api.adviceslip.com/advice';

async function adviceSlip() {
  try {
    const adviceSlipResJson = await fetch(ADVICE_API);
    const adviceSlipRes = await adviceSlipResJson.json();

    return [{
      type: 'quote',
      content: adviceSlipRes.slip.advice,
      author: 'Advice'
    }];
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = adviceSlip;
