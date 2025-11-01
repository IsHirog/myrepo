class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid #333;
        }
        
        .logo {
          font-family: 'Minecraft', monospace;
          color: white;
          font-size: 1.5rem;
          letter-spacing: 2px;
        }
        
        .logo span {
          color: #cc0000;
        }
        
        ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        a {
          color: white;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
        }
        
        a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #cc0000;
          transition: width 0.3s ease;
        }
        
        a:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          ul {
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }

          a {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 1.2rem;
          }

          ul {
            gap: 0.5rem;
          }

          a {
            font-size: 0.8rem;
          }
        }
</style>
      <nav>
        <div class="logo">DEV<span>CHRS</span></div>
        <ul>
          <li><a href="#hero">HOME</a></li>
          <li><a href="#skills">SKILLS</a></li>
          <li><a href="#projects">WORK</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('custom-navbar', CustomNavbar);