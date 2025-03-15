import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const BookCard = ({ book, onRemove }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritesBooks")) || [];
    setIsFavorite(favorites.some((fav) => fav.key === book.key));
  }, [book.key]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoritesBooks")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.key !== book.key);
    } else {
      updatedFavorites = [...favorites, book];
    }

    localStorage.setItem("favoritesBooks", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="book-card">
      <Link to={`/book/${book.key}`}>
        <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "/placeholder.jpg"} alt={book.title} />
      </Link>

      <h3>
        <Link to={`/book/${book.key}`}>{book.title} ({book.first_publish_year || "—"})</Link>
      </h3>

      {!onRemove && (
        <button
          className={`favorite-button ${isFavorite ? "favorite-button--active" : ""}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        </button>
      )}

      {onRemove && (
        <button className="remove-button" onClick={() => onRemove(book.key)}>
          Удалить из избранного
        </button>
      )}
    </div>
  );
};

export default BookCard;
