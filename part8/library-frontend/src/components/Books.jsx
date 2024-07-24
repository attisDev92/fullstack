import { useBooks } from "../hooks/useBooks";

const Books = ({ show }) => {
  const { loading, queryError, refetch, books, booksGenres, setGenre } =
    useBooks();

  if (!show) {
    return null;
  }

  if (loading) {
    return <>Loading ...</>;
  }

  if (queryError) {
    return <>Error: {queryError.message}</>;
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
