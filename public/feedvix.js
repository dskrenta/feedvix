(() => {
  'use strict';

  const API_URL = 'http://localhost:3000/api';
  const CONTENT_ID = 'content';

  async function fetchAndPlaceContent() {
    try {
      const res = await fetch(API_URL);
      const results = await res.json();

      let htmlStr = '';

      for (let result of results) {
        if (result.type === 'img' && result.url) {
          htmlStr += `
            <img src=${result.url}></img>
            <figcaption class="figure-caption">${result.source}</figcaption>
            <hr />
          `;
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
                <small class="text-muted">${result.source.name} - ${result.createdAt}</small>
                ${result.content ? `<p>${result.content}</p>` : ''}
              </div>
              <img src=${result.image} class="align-self-start mr-3"  width="200px" alt="...">
            </div>
            <hr />
          `;
        }
        else if (result.type === 'trivia' && (result.question && result.answer)) {
          htmlStr += `
            <blockquote class="blockquote">
              <p class="mb-0">${result.question}</p>
              <footer class="blockquote-footer">${result.answer}</footer>
              ${result.value ? `<p class="text-muted">${result.value}</p>` : ''}
            </blockquote>
            <hr />
          `;
        }
        else if (result.type === 'quote') {
          htmlStr += `
            <blockquote class="blockquote">
              <p class="mb-0">${result.content}</p>
              <footer class="blockquote-footer">${result.author}</footer>
            </blockquote>
            <hr />
          `;
        }
        else if (result.type === 'wiki') {
          htmlStr += `
            <div class="media">
              <div class="media-body">
                <a href=${result.url} target="_blank" style="text-decoration: none; color: inherit">
                  <h5 class="mt-0">${result.title}</h5>
                </a>
                ${result.content ? `<p>${result.content}</p>` : ''}
                <figcaption class="figure-caption">Wikipedia</figcaption>
              </div>
              ${result.image ? `<img src=${result.image} class="align-self-start mr-3"  width="200px" alt=${result.title}>` : ''}
            </div>
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

  fetchAndPlaceContent();

  document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll('img').forEach((img) => {
     img.onerror = () => this.style.display='none';
    });
 });
})();
