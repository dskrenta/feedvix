(() => {
  'use strict';

  const API_URL = 'http://feedvix.us-west-1.elasticbeanstalk.com/api';
  const DEV_API_URL = 'http://localhost:3000/api';
  const CONTENT_ID = 'content';
  const LOADING_ID = 'loading';

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function fetchAndPlaceContent() {
    try {
      const apiUrl = window.location.href.startsWith('http://localhost') ? DEV_API_URL : API_URL;
      const res = await fetch(apiUrl);
      const results = await res.json();

      let htmlStr = '';

      for (let result of results) {
        if (result.type === 'img' && result.url) {
          htmlStr += `
            <div class="image-container">
              <img src=${result.url} class="img"></img>
              <a href=${result.url} target="_blank" style="text-decoration: none; color: inherit">
                <figcaption class="figure-caption">${result.source}</figcaption>
              </a>
            </div>
          `;
        }
        else if (result.type === 'num') {
          htmlStr += `<h3 class="item">${result.num}</h3>`;
        }
        else if (result.type === 'text') {
          htmlStr += `<h3 class="item">${result.text}</h3>`;
        }
        else if (result.type === 'article') {
          htmlStr += `
            <div class="media item">
              <div class="media-body">
                <a href=${result.url} target="_blank" style="text-decoration: none; color: inherit">
                  <h5 class="mt-0">${result.title}</h5>
                </a>
                <small class="text-muted">${result.source.name} - ${result.createdAt}</small>
                ${result.content ? `<p>${escapeHtml(result.content)}</p>` : ''}
              </div>
              <img src=${result.image} class="align-self-start mr-3"  width="200px" alt="...">
            </div>
          `;
        }
        else if (result.type === 'trivia' && (result.question && result.answer)) {
          htmlStr += `
            <blockquote class="blockquote item">
              <p class="mb-0">${result.question}</p>
              <footer class="blockquote-footer">${result.answer}</footer>
              ${result.value ? `<p class="text-muted">${result.value}</p>` : ''}
            </blockquote>
          `;
        }
        else if (result.type === 'quote') {
          htmlStr += `
            <blockquote class="blockquote item">
              <p class="mb-0">${result.content}</p>
              <footer class="blockquote-footer">${result.author}</footer>
            </blockquote>
          `;
        }
        else if (result.type === 'wiki') {
          htmlStr += `
            <div class="media item wiki">
              <div class="media-body">
                <a href=${result.url} target="_blank" style="text-decoration: none; color: inherit">
                  <h5 class="mt-0">${result.title}</h5>
                </a>
                ${result.content ? `<p>${result.content}</p>` : ''}
                <figcaption class="figure-caption">Wikipedia</figcaption>
              </div>
              ${result.image ? `<img src=${result.image} class="align-self-start mr-3"  width="200px" alt=${result.title}>` : ''}
            </div>
          `;
        }
        else if (result.type === 'joke' && result.content) {
          htmlStr += `
            <blockquote class="blockquote joke item" style="font-family: monospace">
              ${result.content}
            </blockquote>
          `;
        }
        else if (result.type === 'element' && result.content) {
          const info = result.content;
          htmlStr += `
            <div class="media item wiki">
              <div class="media-body">
                <h2 class="mt-0">${info.name} (${info.symbol})</h2>
                <p class="mb-0"">${info.summary}</p>
                <a target="_blank" href="${info.source}">Wikipedia</a>
                <p></p>
                ${info.atomic_mass ? `<p class="mb-0""><b>Atomic Mass:</b> ${info.atomic_mass}</p>` : ''}
                ${info.phase ? `<p class="mb-0""><b>Phase:</b> ${info.phase}</p>` : ''}
                ${info.category ? `<p class="mb-0""><b>Category:</b> ${info.category}</p>` : ''}
                ${info.appearance ? `<p class="mb-0""><b>Appearance:</b> ${info.appearance}</p>` : ''}
                ${info.discovered_by ? `<p class="mb-0""><b>Discovered By:</b> ${info.discovered_by}</p>` : ''}
                ${info.named_by ? `<p class="mb-0""><b>Named By:</b> ${info.named_by}</p>` : ''}
              </div>
              ${atom(info)}
            </div>
          `;
        }
      }

      document.getElementById(LOADING_ID).remove();
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
