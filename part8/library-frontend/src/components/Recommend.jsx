import { useQuery } from "@apollo/client";
import { USER, ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Recommend = (props) => {
  const [userFavoriteGenre, setUserFavoriteGenre] = useState(null);

  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(USER);

  useEffect(() => {
    if (dataUser && dataUser.me) {
      setUserFavoriteGenre(dataUser.me.favoriteGenre);
    }
  }, [dataUser]); //eslint-disable-line

  const {
    loading: loadingBooks,
    error: errorBooks,
    data: dataBooks,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: userFavoriteGenre },
  });

  if (loadingBooks || loadingUser) {
    return <div>Loading...</div>;
  }

  if (errorBooks) {
    return <div>Error fetching books: {errorBooks.message}</div>;
  }

  if (errorUser) {
    return <div>Error fetching authors: {errorUser.message}</div>;
  }

  const books = dataBooks ? dataBooks.allBooks : [];

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
