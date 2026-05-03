import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import PokemonCard from "../components/PokemonCard";
import "./Favorites.css";

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <h1 className="favorites-title">
          <span className="title-accent">Mes Favoris</span>
        </h1>
        <p className="favorites-subtitle">
          {favorites.length === 0
            ? "Aucun Pokémon sauvegardé pour l'instant."
            : `${favorites.length} Pokémon${favorites.length > 1 ? "s" : ""} dans votre collection`}
        </p>
      </div>

      {favorites.length === 0 ? (
        // État vide — inciter l'utilisateur à ajouter des favoris
        <div className="empty-favorites">
          <div className="empty-pokeball">⚪</div>
          <h2>Votre liste est vide</h2>
          <p>
            Parcourez la liste de Pokémons et cliquez sur ❤️ pour les ajouter
            ici.
          </p>
          <button className="btn-explore" onClick={() => navigate("/liste")}>
            Explorer les Pokémons
          </button>
        </div>
      ) : (
        <div className="pokemon-grid">
          {favorites.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
}
