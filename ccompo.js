class PostCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
      // Get the index from the attribute
      const index = this.getAttribute('index');
      
      // Fetch the JSON data from /meta/<index>.json
      try {
        const response = await fetch(`/meta/${index}.json`);
        const data = await response.json();
        
        // Construct HTML content from fetched data
        this.shadowRoot.innerHTML = `
          <style>
            .card {
              border: 1px solid #ddd;
              border-radius: 10px;
              padding: 12px;
              max-width: 300px;
              text-align: center;
              font-family: sans-serif;
              background: #fafafa;
            }
            img {
              width: 100%;
              border-radius: 10px;
            }
            h3 {
              margin: 0.5em 0 0.2em;
            }
            p {
              font-size: 0.9em;
              color: #555;
            }
            a {
              color: royalblue;
              text-decoration: none;
              font-weight: bold;
            }
          </style>
          <div class="card">
            <h3>${data.title}</h3>
            <img src="${data.image}" alt="${data.title}">
            <p>${data.intro}</p>
            <a href="/entries/${index}.html">Read full entrie</a>
          </div>
        `;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.shadowRoot.innerHTML = `<p>Error loading content.</p>`;
      }
    }
  }

  // Define the custom element
customElements.define('post-card', PostCard);
