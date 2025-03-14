import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles.css";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.id === data.id));
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, [id]);

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

  if (!movie) return <p>Загрузка...</p>;

  return (
    <div className="movie-detail">
      <button className="back-button" onClick={() => navigate(-1)}>Назад</button>
      <h2>{movie.name} ({movie.premiered?.slice(0, 4) || "—"})</h2>
      <img src={movie.image?.medium || "/placeholder.jpg"} alt={movie.name} />
      <p dangerouslySetInnerHTML={{ __html: movie.summary }} />

      <button 
        className={`favorite-button ${isFavorite ? "favorite-button--active" : ""}`} 
        onClick={toggleFavorite}
      >
        {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      </button>
    </div>
  );
};

export default MoviePage;
