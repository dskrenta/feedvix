'use strict';

const wiki = require('wikijs').default;
const wikiApi = wiki({ headers: { 'User-Agent': 'Feedvix (http://feedvix.com; dskrenta@gmail.com) wiki.js' } });

const WIKI_LIMIT = 25;

async function wikiModule() {
  try {
    const titles = await wikiApi.random(WIKI_LIMIT);

    const pagePromises = titles.map(async (title) => {
      try {
        const page = await wikiApi.page(title);
        return {
          type: 'wiki',
          title,
          image: await page.mainImage(),
          content: await page.summary(),
          url: page.url()
        };
      }
      catch (error) {
        console.error('Wiki module page fetch error', error);
        return {};
      }
    });

    return await Promise.all(pagePromises);
  }
  catch (error) {
    console.error('Wiki error', error);
  }
}

module.exports = wikiModule;
