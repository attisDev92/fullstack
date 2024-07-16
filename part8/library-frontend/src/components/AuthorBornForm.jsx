import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";

const AuthorBornForm = ({ authors }) => {
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState(0);

  const [editAuthorBorn, { error }] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthorBorn({ variables: { author, born: parseInt(born) } });
    setAuthor("");
    setBorn(0);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Name:{" "}
        <select onChange={({ target }) => setAuthor(target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        Born:{" "}
        <input
          type="number"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">Editar</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </>
  );
};

export default AuthorBornForm;
