(() => {
  'use strict';

  const API_URL = 'http://localhost:3000/api';
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
          htmlStr += `<h3>${result.num}</h3><hr />`;
        }
        else if (result.type === 'text') {
          htmlStr += `<h3>${result.text}</h3><hr />`;
        }
        else if (result.type === 'article') {
          htmlStr += `
            <div class="media">
              <div class="media-body">
                <a href=${result.url} target="_blank" style="text-decoration: none; color: inherit">
                  <h5 class="mt-0">${result.title}</h5>
                </a>
                <p>${result.content}</p>
              </div>
              <img src=${result.image} class="align-self-start mr-3"  width="200px" alt="...">
            </div>
            <hr />
          `;
          /*
          htmlStr += `
            <img src=${result.image} width="200px"></img>
            <a href=${result.url} target="_blank">
              <h3>${result.title}</h3>
            </a>
            <small>${result.source.name} - ${result.createdAt}</small>
            <p>${result.content}</p>
            <hr />
          `;
          */
        }
        else if (result.type === 'trivia') {
          htmlStr += `
            <p>${result.question}</p>
            <p style="font-weight: bold">${result.answer}</p>
            <p>${result.value}</p>
            <hr />
          `;
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
