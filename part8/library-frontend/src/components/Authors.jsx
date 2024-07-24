import { ALL_AUTHORS } from "../Graphql/authorQueries";
import { useQuery } from "@apollo/client";
import AuthorBornForm from "./AuthorBornForm";

const Authors = ({ show, token }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error: {error.message}</>;
  }
  const authors = data.allAuthors;

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ? <AuthorBornForm authors={authors} /> : null}
    </div>
  );
};

export default Authors;
