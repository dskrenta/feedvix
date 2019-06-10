(() => {
  'use strict';

  const API_URL = 'http://localhost:3000';
  const CONTENT_ID = 'content';

  async function fetchPlaceContent() {
    try {
      const res = await fetch(API_URL);
      const results = await res.json();

      console.log(results);

      let htmlStr = '';

      for (let result of results) {
        if (result.type === 'img') {
          htmlStr += `<img src=${result.url}></img><hr />`;
        }
        else if (result.type === 'num') {
          htmlStr += `<h3>${result.num}</h3><hr />`
        }
      }

      document.getElementById(CONTENT_ID).insertAdjacentHTML('afterbegin', htmlStr);
    }
    catch (error) {
      console.error(error);
    }
  }

  fetchPlaceContent();
})();
