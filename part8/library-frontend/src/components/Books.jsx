import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : {},
  });

  const [books, setBooks] = useState([]);
  const [booksGenres, setBooksGenres] = useState([]);

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks);
      const allGenres = data.allBooks.reduce((totalGenres, book) => {
        return totalGenres.concat(book.genres);
      }, []);
      setBooksGenres([...new Set(allGenres)]);
    }
  }, [data]);

  if (loading) {
    return <>Loading ...</>;
  }
  if (error) {
    return <>Error: {error.message}</>;
  }

  if (!props.show) {
    return null;
  }

  const handleSetGenre = (genre) => {
    setGenre(genre);
    refetch({ genre });
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
      <button onClick={() => setGenre(null)}>all books</button>
      {booksGenres.map((g) => (
        <button key={g} onClick={() => handleSetGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
