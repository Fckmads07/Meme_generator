import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./PokemonCard.css";

// Couleurs associées aux types de pokémon
const typeColors = {
  fire: "#FF6B35",
  water: "#4FC3F7",
  grass: "#66BB6A",
  electric: "#FFD600",
  psychic: "#F06292",
  ice: "#80DEEA",
  dragon: "#7B61FF",
  dark: "#546E7A",
  fairy: "#F48FB1",
  normal: "#A0A0A0",
  fighting: "#E64A19",
  flying: "#81D4FA",
  poison: "#AB47BC",
  ground: "#BCAAA4",
  rock: "#8D6E63",
  bug: "#AED581",
  ghost: "#7E57C2",
  steel: "#B0BEC5",
};

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(pokemon.id);

  // Capitaliser le nom du pokémon
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Numéro de pokédex formaté (#001, #025, etc.)
  const pokedexNumber = `#${String(pokemon.id).padStart(3, "0")}`;

  const primaryType = pokemon.types?.[0]?.type?.name || "normal";
  const typeColor = typeColors[primaryType] || "#A0A0A0";

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handleFavoriteClick = (e) => {
    // Empêcher la navigation vers la page de détail lors du clic sur le bouton
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  return (
    <div
      className="pokemon-card"
      onClick={handleCardClick}
      style={{ "--type-color": typeColor }}
    >
      <div className="card-header">
        <span className="pokemon-number">{pokedexNumber}</span>
        <button
          className={`favorite-btn ${favorite ? "favorited" : ""}`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {favorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="card-image-wrapper">
        <img
          src={
            pokemon.sprites?.other?.["official-artwork"]?.front_default ||
            pokemon.sprites?.front_default
          }
          alt={pokemon.name}
          className="pokemon-image"
          loading="lazy"
        />
      </div>

      <div className="card-body">
        <h3 className="pokemon-name">{capitalize(pokemon.name)}</h3>
        <div className="type-badges">
          {pokemon.types?.map((t) => (
            <span
              key={t.type.name}
              className="type-badge"
              style={{ background: typeColors[t.type.name] || "#A0A0A0" }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
