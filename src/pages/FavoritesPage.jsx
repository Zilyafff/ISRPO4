import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>Назад</button>
      <h1>Избранные фильмы</h1>
      <div className="movies-grid">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onRemove={removeFromFavorites} />
          ))
        ) : (
          <p className="no-movies">Вы еще не добавили фильмы в избранное</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
