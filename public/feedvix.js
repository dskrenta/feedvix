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

function saveButton(result, saved) {
  const text = escapeHtml(JSON.stringify(result))
  return saved 
    ? `<button id="save" onclick="remove(\`${text}\`);">
        remove
      </button>` 
    : `<button 
        id="save" 
        onclick="
          save(\`${text}\`);
          this.innerText = 'saved';
          this.style.background = 'green';
          this.style.color = 'white';
        "
      >
        save
      </button>`;
}

async function getContent() {
  const apiUrl = window.location.href.startsWith('http://localhost') ? DEV_API_URL : API_URL;
  const res = await fetch(apiUrl);
  const results = await res.json();

  return results;
}

async function fetchAndPlaceContent(
  loadingID = LOADING_ID, 
  contentID = CONTENT_ID,
  saved = false
) {
  try {
    let results = [];
    if (saved) {
      document.getElementById(contentID).innerHTML = '';
      const saved = localStorage.getItem('feedvix-saved');
      if (saved) results = JSON.parse(saved);
    }
    else {
      results = await getContent();
    }

    let htmlStr = '';

    for (let result of results) {
      if (saved) result = JSON.parse(result);
      if (result.type === 'img' && result.url) {
        htmlStr += `
          <hr />
          <img src=${result.url} class="img"></img>
          <a href=${result.url} target="_blank" style="text-decoration: none; color: inherit">
            <figcaption class="figure-caption">${result.source}</figcaption>
          </a>
          ${saveButton(result, saved)}
          <hr />
        `;
      }
      else if (result.type === 'num') {
        htmlStr += `
          <h3 class="item">
            ${result.num}
            ${saveButton(result, saved)}
          </h3>
        `;
      }
      else if (result.type === 'text') {
        htmlStr += `
          <h3 class="item">
            ${result.text}
            ${saveButton(result, saved)}
          </h3>
        `;
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
              ${saveButton(result, saved)}
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
            ${result.value ? `<p class="text-muted mb-0">${result.value}</p>` : ''}
            ${saveButton(result, saved)}
          </blockquote>
        `;
      }
      else if (result.type === 'quote') {
        htmlStr += `
          <blockquote class="blockquote item">
            <p class="mb-0">${result.content}</p>
            <footer class="blockquote-footer">${result.author}</footer>
            ${saveButton(result, saved)}
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
              ${result.content ? `<p class="mt-0">${result.content}</p>` : ''}
              <figcaption class="figure-caption">Wikipedia</figcaption>
              ${saveButton(result, saved)}
            </div>
            ${result.image ? `<img src=${result.image} class="align-self-start mr-3"  width="200px" alt=${result.title}>` : ''}
          </div>
        `;
      }
      else if (result.type === 'joke' && result.content) {
        htmlStr += `
          <blockquote class="blockquote joke item" style="font-family: monospace">
            ${result.content}
            ${saveButton(result, saved)}
          </blockquote>
        `;
      }
    }

    const loading = document.getElementById(loadingID);
    if (loading) loading.remove();
    document.getElementById(contentID).insertAdjacentHTML('afterbegin', htmlStr);
  }
  catch (error) {
    console.error(error);
  }
}

function save(result) {
  const saved = localStorage.getItem('feedvix-saved');
  
  let content = [];
  if (saved) content = JSON.parse(saved);
  content.push(result);

  localStorage.setItem('feedvix-saved', JSON.stringify(content));
}

function getSaved() {
  const saved = localStorage.getItem('feedvix-saved');
  return saved ? JSON.parse(saved) : [];
}

function remove(result) {
  const saved = localStorage.getItem('feedvix-saved');
  
  let content = [];
  if (saved) content = JSON.parse(saved);
  content = content.filter(item => item !== result);
  
  localStorage.setItem('feedvix-saved', JSON.stringify(content));
  fetchAndPlaceContent('savedLoading', 'savedContent', true)
}

(() => {
  fetchAndPlaceContent();

  document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll('img').forEach((img) => {
      img.onerror = () => this.style.display='none';
    });
  });

  document.getElementById('showSaved').addEventListener("click", (event) => {
    const show = document.getElementById('showSaved');
    const saved = document.getElementById('saved');
    const display = saved.style.display;
    
    if (display === 'block') {
      saved.style.display = 'none';
      show.innerText = 'show saved';
      document.body.style.overflowY = 'auto';
    }
    else {
      fetchAndPlaceContent('savedLoading', 'savedContent', true);
      saved.style.display = 'block';
      show.innerText = 'close saved';
      document.body.style.overflowY = 'hidden';
    }
  });
})();