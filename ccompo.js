class PostCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const index = this.getAttribute('index');
    try {
      const response = await fetch(`/meta/${index}.json`);
      const data = await response.json();

      this.shadowRoot.innerHTML = `
        <style>
          .card {
            border: 1px solid #a58c66;
            border-radius: 8px;
            padding: 16px;
            max-width: 340px;
            text-align: center;
            font-family: Georgia, 'Times New Roman', serif;
            background: #fbf1c7;
            color: #3e2e1c;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
            margin: 12px auto;
          }

          img {
            width: 100%;
            border-radius: 6px;
            margin-bottom: 12px;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
          }

          h3 {
            font-size: 1.4em;
            margin: 0.5em 0 0.3em;
          }

          p {
            font-size: 1em;
            line-height: 1.6;
          }

          a {
            display: inline-block;
            margin-top: 10px;
            text-decoration: none;
            color: #7c513a;
            background: #e4d1b0;
            padding: 6px 12px;
            border-radius: 5px;
            font-weight: bold;
            transition: background 0.3s ease;
          }

          a:hover {
            background: #d3bb95;
          }
        </style>
        <div class="card">
          <h3>${data.title}</h3>
          <img src="${data.image}" alt="${data.title}">
          <p>${data.intro}</p>
          <a href="/entries/${index}.html">Read full entry</a>
        </div>
      `;
    } catch (error) {
      console.error("Error fetching data:", error);
      this.shadowRoot.innerHTML = `<p>Error loading content.</p>`;
    }
  }
}

customElements.define('post-card', PostCard);
