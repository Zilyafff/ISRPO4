import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../styles.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("Breaking Bad");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.map((item) => item.show)))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, [search]);

  const filteredMovies = movies.filter((movie) => {
    if (!year) return true;
    return movie.premiered?.startsWith(year);
  });

  return (
    <div className="container">
      <div className="header">
        <h1>Поиск фильмов</h1>
        <Link to="/favorites" className="favorites-button">Избранное</Link>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Введите название..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Введите год..."
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="no-movies">Фильмы не найдены</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
