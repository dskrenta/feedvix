'use strict';

const jokesArr = require('../data/jokes');
const rand = require('../utils/rand');

async function jokes() {
  const jokeIndexes = new Array(100).fill(0).map(() => rand(0, jokesArr.length - 1));

  return jokeIndexes.map((index) => {
    return {
      type: 'joke',
      content: jokesArr[index]
    }
  });
}

module.exports = jokes;
