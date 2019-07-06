'use strict';

const fetch = require('node-fetch');

const WIKI_LIMIT = 25;
const RANDOM_WIKI_API = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=${WIKI_LIMIT}&rnnamespace=0`;
const WIKI_SUMMARY_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

async function wiki() {
  try {
    const results = [];

    const randomWikiResJson = await fetch(RANDOM_WIKI_API);
    const randomWikiRes = await randomWikiResJson.json();

    for (let wiki of randomWikiRes.query.random) {
      const summaryResJson = await fetch(`${WIKI_SUMMARY_API}${encodeURIComponent(wiki.title.replace(' ', '_'))}`);
      const summaryRes = await summaryResJson.json();

      if (summaryRes && summaryRes.title !== 'Not found.') {
        results.push({
          // ...summaryRes,
          type: 'wiki',
          title: summaryRes.titles.normalized,
          image: summaryRes.originalimage ? summaryRes.originalimage.source : null,
          content: summaryRes.extract ? summaryRes.extract : null,
          url: summaryRes.content_urls ? summaryRes.content_urls.desktop.page : null
        });
      }
    }

    return results;
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = wiki;
