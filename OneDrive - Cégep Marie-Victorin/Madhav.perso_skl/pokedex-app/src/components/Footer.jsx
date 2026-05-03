import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-icon">⚡</span>
          <span className="footer-app-name">PokéDex App</span>
        </div>
        <div className="footer-info">
          <span>
            API :{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              PokéAPI
            </a>
          </span>
          <span className="footer-separator">·</span>
          <span>Développé par Madhav</span>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} PokéDex App</p>
      </div>
    </footer>
  );
}
