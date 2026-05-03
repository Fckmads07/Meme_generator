import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import "./PokemonList.css";

// Nombre de pokémons à charger par page (pagination)
const PAGE_SIZE = 20;

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  // Charger la liste de pokémons depuis l'API
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        // Récupérer la liste (noms + URLs)
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
        );
        if (!res.ok) throw new Error("Impossible de charger les Pokémons.");
        const data = await res.json();
        setTotal(data.count);

        // Récupérer les détails de chaque pokémon en parallèle
        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        );
        setPokemonList(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [offset]);

  // Filtrer par nom selon la saisie de l'utilisateur
  const filtered = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="list-page">
      <div className="list-header">
        <h1 className="list-title">
          <span className="title-accent">Pokémons</span>
        </h1>
        <p className="list-subtitle">
          {total > 0 ? `${total} Pokémons disponibles` : "Chargement..."}
        </p>

        {/* Champ de recherche */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* État de chargement */}
      {loading && (
        <div className="loading-grid">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="error-message">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* Liste de cartes */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span>😔</span>
              <p>Aucun Pokémon trouvé pour « {search} »</p>
            </div>
          ) : (
            <div className="pokemon-grid">
              {filtered.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}

          {/* Pagination (bonus) - seulement si pas de recherche active */}
          {!search && (
            <div className="pagination">
              <button
                className="page-btn"
                disabled={offset === 0}
                onClick={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
              >
                ← Précédent
              </button>
              <span className="page-info">
                Page {Math.floor(offset / PAGE_SIZE) + 1} /{" "}
                {Math.ceil(total / PAGE_SIZE)}
              </span>
              <button
                className="page-btn"
                disabled={offset + PAGE_SIZE >= total}
                onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
