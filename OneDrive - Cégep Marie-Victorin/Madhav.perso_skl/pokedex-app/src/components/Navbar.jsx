import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./Navbar.css";

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="brand-icon">⚡</span>
        <span className="brand-text">PokéDex</span>
      </NavLink>

      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            end
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/liste"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Pokémons
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favoris"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Favoris
            {favorites.length > 0 && (
              <span className="badge">{favorites.length}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
