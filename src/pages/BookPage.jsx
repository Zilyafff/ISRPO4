import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles.css";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        const favorites = JSON.parse(localStorage.getItem("favoritesBooks")) || [];
        setIsFavorite(favorites.some((fav) => fav.key === data.key));
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, [id]);

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

  if (!book) return <p>Загрузка...</p>;

  return (
    <div className="book-detail">
      <button className="back-button" onClick={() => navigate(-1)}>Назад</button>
      <h2>{book.title}</h2>
      <img 
        src={book.covers ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg` : "/placeholder.jpg"} 
        alt={book.title} 
      />
      <p>{book.created?.value ? `Год написания: ${new Date(book.created.value).getFullYear()}` : "Год написания отсутствует."}</p>
      <p>{typeof book.description === "string" ? book.description : book.description?.value || "Описание отсутствует."}</p>

      <button 
        className={`favorite-button ${isFavorite ? "favorite-button--active" : ""}`} 
        onClick={toggleFavorite}
      >
        {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      </button>
    </div>
  );
};

export default BookPage;
