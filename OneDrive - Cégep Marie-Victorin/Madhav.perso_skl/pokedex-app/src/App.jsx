import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PokemonList from "./pages/PokemonList";
import Favorites from "./pages/Favorites";
import PokemonDetail from "./pages/PokemonDetail";
import "./App.css";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/liste" element={<PokemonList />} />
              <Route path="/favoris" element={<Favorites />} />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
