import { useField } from "../hooks/useField";
import { useEditAuthor } from "../hooks/useAuthor";

const AuthorBornForm = ({ authors }) => {
  const name = useField();
  const born = useField("number", 0);
  const { editAuthorBorn, error } = useEditAuthor();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      editAuthorBorn({
        variables: {
          name: name.inputProperties.value,
          born: parseInt({ born: born.inputProperties.value }),
        },
      });
      name.reset();
      born.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Name:{" "}
        <select
          onChange={name.inputProperties.onChange}
          value={name.inputProperties.value}
        >
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        Born: <input {...born.inputProperties} />
        <button type="submit">Editar</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </>
  );
};

export default AuthorBornForm;
