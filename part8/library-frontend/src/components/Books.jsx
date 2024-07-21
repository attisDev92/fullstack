import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const { loading, error, data } = useQuery(ALL_BOOKS);
  if (loading) {
    return <>Loading ...</>;
  }
  if (error) {
    return <>Error: {error.message}</>;
  }
  const books =
    genre.length > 0
      ? data.allBooks.filter((b) => b.genres.includes(genre))
      : data.allBooks;

  if (!props.show) {
    return null;
  }

  const allGenres = books.reduce((totalGenres, book) => {
    return totalGenres.concat(book.genres);
  }, []);

  const booksGenres = [...new Set(allGenres)];

  const handleSetGenre = (genre) => {
    setGenre(genre);
  };

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author?.name ?? "Unknown Author"}</td>
              <td>{b.published ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenre("")}>all books</button>
      {booksGenres.map((g) => (
        <button key={g} onClick={() => handleSetGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
