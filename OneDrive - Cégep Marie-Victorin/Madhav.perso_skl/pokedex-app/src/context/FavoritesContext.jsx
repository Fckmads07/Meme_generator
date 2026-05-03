import { createContext, useContext, useState, useEffect } from "react";

// Créer le contexte pour les favoris
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Initialiser les favoris depuis le localStorage (bonus: persistance)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("pokedex-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sauvegarder dans le localStorage chaque fois que les favoris changent
  useEffect(() => {
    localStorage.setItem("pokedex-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Vérifier si un pokémon est déjà dans les favoris
  const isFavorite = (id) => favorites.some((p) => p.id === id);

  // Ajouter un pokémon aux favoris
  const addFavorite = (pokemon) => {
    setFavorites((prev) => [...prev, pokemon]);
  };

  // Retirer un pokémon des favoris
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  // Basculer entre ajout et suppression
  const toggleFavorite = (pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte des favoris
export function useFavorites() {
  return useContext(FavoritesContext);
}
