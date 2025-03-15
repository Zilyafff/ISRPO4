import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import BookCard from "../components/BookCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritesBooks")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (key) => {
    const updatedFavorites = favorites.filter((book) => book.key !== key);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoritesBooks", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>Назад</button>
      <h1>Избранные книги</h1>
      <div className="books-grid">
        {favorites.length > 0 ? (
          favorites.map((book) => (
            <BookCard key={book.key} book={book} onRemove={removeFromFavorites} />
          ))
        ) : (
          <p className="no-books">Вы еще не добавили книги в избранное</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
