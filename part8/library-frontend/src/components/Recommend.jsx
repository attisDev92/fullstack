import { useUser } from "../hooks/useUser";
import { useBooksByGenre } from "../hooks/useBooks";

const Recommend = (props) => {
  const { loading: loadingUser, error: errorUser, favoriteGenre } = useUser();
  const {
    loading: loadingBooks,
    error: errorBooks,
    books,
  } = useBooksByGenre(favoriteGenre);

  if (loadingBooks || loadingUser) {
    return <div>Loading...</div>;
  }

  if (errorBooks) {
    return <div>Error fetching books: {errorBooks.message}</div>;
  }

  if (errorUser) {
    return <div>Error fetching authors: {errorUser.message}</div>;
  }

  if (!props.show) {
    return null;
  }

  return (
    <>
      <h2>Recommendations</h2>
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
    </>
  );
};

export default Recommend;
