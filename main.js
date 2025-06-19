import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

    import { format } from 'https://cdn.skypack.dev/date-fns@2.30.0';

    const SUPABASE_URL = 'https://xmmdqmscqcqpvvbbrbxz.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtbWRxbXNjcWNxcHZ2YmJyYnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDcyMDYsImV4cCI6MjA2MzkyMzIwNn0.ev8jgE0IkOiH73Gx4jGjqdKAcZCywe6Q3mIhbvzzi9w';
    const TABLE_NAME = 'article';

const fetchArticles = async (order = 'created_at.desc') => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*&order=${order}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  const article = await res.json();
  const container = document.getElementById('article');
  container.innerHTML = '';

  article.reverse().forEach(({ title, subtitle, author, content, created_at }) => {
    const formattedDate = format(new Date(created_at), 'dd-MM-yyyy');
    const articleEl = document.createElement('article');
    articleEl.innerHTML = `
      <h2>${title}</h2>
      <h4>${subtitle}</h4>
      <p><strong>Autor:</strong> ${author} | <em>${formattedDate}</em></p>
      <p>${content}</p>
    `;
    container.appendChild(articleEl);
  });
};

    document.getElementById('article-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const subtitle = document.getElementById('subtitle').value;
      const author = document.getElementById('author').value;
      const content = document.getElementById('content').value;
      const created_at = new Date(document.getElementById('created_at').value).toISOString();

      const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({ title, subtitle, author, content, created_at })
      });

      if (res.ok) {
        document.getElementById('article-form').reset();
        fetchArticles(document.getElementById('sort').value);
      } else {
        const error = await res.text();
        alert('Błąd przy dodawaniu artykułu: ' + error);
      }
    });

    document.getElementById('sort').addEventListener('change', (e) => {
      fetchArticles(e.target.value);
    });

    fetchArticles();
