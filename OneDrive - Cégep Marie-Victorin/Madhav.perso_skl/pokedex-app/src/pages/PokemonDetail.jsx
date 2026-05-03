import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./PokemonDetail.css";

// Couleurs des types
const typeColors = {
  fire: "#FF6B35", water: "#4FC3F7", grass: "#66BB6A", electric: "#FFD600",
  psychic: "#F06292", ice: "#80DEEA", dragon: "#7B61FF", dark: "#546E7A",
  fairy: "#F48FB1", normal: "#A0A0A0", fighting: "#E64A19", flying: "#81D4FA",
  poison: "#AB47BC", ground: "#BCAAA4", rock: "#8D6E63", bug: "#AED581",
  ghost: "#7E57C2", steel: "#B0BEC5",
};

// Noms des statistiques en français
const statLabels = {
  hp: "PV", attack: "Attaque", defense: "Défense",
  "special-attack": "Att. Spé.", "special-defense": "Déf. Spé.", speed: "Vitesse",
};

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les détails du pokémon via son ID
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Pokémon introuvable.");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="pokeball-spinner" />
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <p>⚠️ {error}</p>
        <button onClick={() => navigate("/liste")}>Retour à la liste</button>
      </div>
    );
  }

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const primaryType = pokemon.types?.[0]?.type?.name || "normal";
  const typeColor = typeColors[primaryType] || "#A0A0A0";
  const favorite = isFavorite(pokemon.id);

  return (
    <main className="detail-page" style={{ "--type-color": typeColor }}>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="detail-card">
        {/* Section gauche : image */}
        <div className="detail-visual">
          <div className="detail-glow" />
          <img
            src={
              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default
            }
            alt={pokemon.name}
            className="detail-image"
          />
        </div>

        {/* Section droite : infos */}
        <div className="detail-info">
          <div className="detail-top">
            <span className="detail-number">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
            <button
              className={`detail-favorite-btn ${favorite ? "favorited" : ""}`}
              onClick={() => toggleFavorite(pokemon)}
            >
              {favorite ? "❤️ Dans mes favoris" : "🤍 Ajouter aux favoris"}
            </button>
          </div>

          {/* Propriété 1 : Nom */}
          <h1 className="detail-name">{capitalize(pokemon.name)}</h1>

          {/* Propriété 2 : Types */}
          <div className="detail-types">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="detail-type-badge"
                style={{ background: typeColors[t.type.name] || "#A0A0A0" }}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          {/* Propriétés 3 & 4 : Taille et Poids */}
          <div className="detail-measurements">
            <div className="measurement">
              <span className="measurement-label">Taille</span>
              <span className="measurement-value">
                {(pokemon.height / 10).toFixed(1)} m
              </span>
            </div>
            <div className="measurement-divider" />
            <div className="measurement">
              <span className="measurement-label">Poids</span>
              <span className="measurement-value">
                {(pokemon.weight / 10).toFixed(1)} kg
              </span>
            </div>
            <div className="measurement-divider" />
            {/* Propriété 5 : Expérience de base */}
            <div className="measurement">
              <span className="measurement-label">Exp. de base</span>
              <span className="measurement-value">
                {pokemon.base_experience ?? "—"}
              </span>
            </div>
          </div>

          {/* Propriété 6 : Capacités */}
          <div className="detail-section">
            <h3 className="section-title">Capacités</h3>
            <div className="abilities">
              {pokemon.abilities.map((a) => (
                <span key={a.ability.name} className="ability-tag">
                  {capitalize(a.ability.name.replace("-", " "))}
                  {a.is_hidden && <em> (cachée)</em>}
                </span>
              ))}
            </div>
          </div>

          {/* Propriété 7 : Statistiques */}
          <div className="detail-section">
            <h3 className="section-title">Statistiques</h3>
            <div className="stats-list">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="stat-row">
                  <span className="stat-name">
                    {statLabels[s.stat.name] || s.stat.name}
                  </span>
                  <span className="stat-value">{s.base_stat}</span>
                  <div className="stat-bar-bg">
                    <div
                      className="stat-bar-fill"
                      style={{ width: `${Math.min(100, (s.base_stat / 255) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
