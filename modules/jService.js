'use strict';

const fetch = require('node-fetch');

const JSERVICE_API_ENDPOINT = 'http://jservice.io/api/random?count=100';

async function jService() {
  try {
    const jserviceResults = await fetch(JSERVICE_API_ENDPOINT);
    const jserviceObj = await jserviceResults.json();

    return jserviceObj.map(question => {
      return {
        type: 'trivia',
        question: question.question,
        answer: question.answer,
        value: question.value
      };
    });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = jService;
