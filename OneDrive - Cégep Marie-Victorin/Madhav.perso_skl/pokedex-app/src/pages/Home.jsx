import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      {/* Section Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="pokeball-bg" aria-hidden="true">
            <div className="pokeball-circle"></div>
          </div>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Bienvenue dans le</p>
          <h1 className="hero-title">
            <span className="title-poke">Poké</span>
            <span className="title-dex">Dex</span>
          </h1>
          <p className="hero-description">
            Explorez les 151 Pokémon originaux. Recherchez vos préférés, découvrez
            leurs types, statistiques et capacités, et construisez votre collection
            de favoris.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("/liste")}
            >
              Explorer les Pokémons
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/favoris")}
            >
              Mes Favoris
            </button>
          </div>
        </div>

        {/* Pikachu hero image */}
        <div className="hero-visual">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Pikachu"
            className="hero-pokemon"
          />
          <div className="hero-glow" />
        </div>
      </section>

      {/* Section features */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Recherche rapide</h3>
            <p>Trouvez n'importe quel Pokémon instantanément par son nom.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📋</span>
            <h3>Fiches détaillées</h3>
            <p>Types, statistiques, taille, poids et capacités pour chaque Pokémon.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">❤️</span>
            <h3>Collection favoris</h3>
            <p>Sauvegardez vos Pokémon préférés. Votre liste persiste entre les sessions.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
