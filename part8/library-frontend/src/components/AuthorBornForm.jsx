import { useField } from "../hooks/useField";
import { useEditAuthor } from "../hooks/useAuthor";

const AuthorBornForm = ({ authors }) => {
  const name = useField();
  const bornInput = useField("number", 0);
  const born = { ...bornInput, reset: "__" };
  const { editAuthorBorn, error } = useEditAuthor();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      editAuthorBorn({
        variables: { name: name.value, born: parseInt({ born: born.value }) },
      });
      name.reset();
      bornInput.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Name:{" "}
        <select onChange={name.onChange} value={name.value}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        Born: <input {...born} />
        <button type="submit">Editar</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </>
  );
};

export default AuthorBornForm;
