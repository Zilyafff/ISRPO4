import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import "../styles.css";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("Harry Potter");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetch(`https://openlibrary.org/search.json?title=${search}`)
      .then((response) => response.json())
      .then((data) => setBooks(data.docs))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, [search]);

  const filteredBooks = books.filter((book) => {
    if (!year) return true;
    return book.first_publish_year?.toString().startsWith(year);
  });

  return (
    <div className="container">
      <div className="header">
        <h1>Поиск книг</h1>
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

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book.key} book={book} />)
        ) : (
          <p className="no-books">Книги не найдены</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
