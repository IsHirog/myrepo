class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: #111;
          color: white;
          padding: 3rem 2rem;
          text-align: center;
          border-top: 1px solid #333;
          font-family: 'Minecraft', monospace;
        }
        .status {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          flex-wrap: wrap;
        }
        .status span {
          color: #cc0000;
        }
        .status a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .status a:hover {
          color: #cc0000;
        }
        .copyright {
          font-size: 0.8rem;
          opacity: 0.7;
        }
        @media (max-width: 768px) {
          footer {
            padding: 2rem 1rem;
          }
          .status {
            flex-direction: column;
            gap: 0.5rem;
            font-size: 0.8rem;
          }
        }
      </style>

      <footer>
        <div class="status">
          <span>VISITORS:</span> <span id="visitor-count">...</span> |
          <span>LAST REPO:</span> <a id="repo-link" href="#" target="_blank">CARREGANDO...</a> |
          <span>PORTFOLIO UPDATED:</span> <span id="portfolio-update">...</span>
        </div>

        <div class="copyright">
          © 2025 DEVCHRS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    `;

    // 1️⃣ Contagem de visitantes com autenticação
    fetch('https://api.counterapi.dev/v2/meu-portfolio/visitor-count-tets/up', {
      headers: {
        'Authorization': 'Bearer ut_bUkjITHiVvQjoSQnVln04mHhVghfXjBn1JULhB2m'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.shadowRoot.querySelector("#visitor-count").textContent = data.value;
    })
    .catch(() => {
      this.shadowRoot.querySelector("#visitor-count").textContent = "N/A";
    });

    // 2️⃣ Último repositório atualizado do GitHub
    fetch("https://api.github.com/users/IsHirog/repos?sort=updated&direction=desc")
      .then(res => res.json())
      .then(repos => {
        const repo = repos[0];
        const repoLink = this.shadowRoot.querySelector("#repo-link");
        if (repo) {
          repoLink.textContent = repo.name;
          repoLink.href = repo.html_url;
        } else {
          repoLink.textContent = "Nenhum repositório";
          repoLink.href = "#";
        }
      })
      .catch(() => {
        const repoLink = this.shadowRoot.querySelector("#repo-link");
        repoLink.textContent = "Erro";
        repoLink.href = "#";
      });

    // 3️⃣ Última atualização do repositório do portfólio
    fetch(`https://api.github.com/repos/IsHirog/myrepo/commits?per_page=1`)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(commits => {
        if (commits.length > 0) {
          const date = new Date(commits[0].commit.committer.date);
          this.shadowRoot.querySelector("#portfolio-update").textContent = date.toLocaleDateString();
        } else {
          this.shadowRoot.querySelector("#portfolio-update").textContent = "N/A";
        }
      })
      .catch(err => {
        console.error("Erro GitHub commits:", err);
        this.shadowRoot.querySelector("#portfolio-update").textContent = "Erro";
      });
  }
}

customElements.define('custom-footer', CustomFooter);
