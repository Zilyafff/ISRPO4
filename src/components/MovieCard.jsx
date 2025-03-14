import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const MovieCard = ({ movie, onRemove }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.image?.medium || "/placeholder.jpg"} alt={movie.name} />
        <h3>{movie.name} ({movie.premiered?.slice(0, 4) || "—"})</h3>
      </Link>

      {!onRemove && (
        <button
          className={`favorite-button ${isFavorite ? "favorite-button--active" : ""}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        </button>
      )}

      {onRemove && (
        <button className="remove-button" onClick={() => onRemove(movie.id)}>
          Удалить из избранного
        </button>
      )}
    </div>
  );
};

export default MovieCard;
