import { useBooks } from "../hooks/useBooks";

const Books = ({ show }) => {
  const { loading, error, refetch, books, booksGenres, setGenre } = useBooks();

  if (!show) {
    return null;
  }

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  const handleSetGenre = (genre) => {
    setGenre(genre);
    refetch({ genre });
  };

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author?.name ?? "Unknown Author"}</td>
              <td>{b.published ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleSetGenre(null)}>All Books</button>
      {booksGenres.map((g) => (
        <button key={g} onClick={() => handleSetGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
