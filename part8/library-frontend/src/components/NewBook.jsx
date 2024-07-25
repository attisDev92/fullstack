import { useState } from "react";
import { useField } from "../hooks/useField";
import { useCreateBook } from "../hooks/useBooks";

const NewBook = ({ show }) => {
  const title = useField();
  const author = useField();
  const published = useField("number", 0);
  const genre = useField();
  const [genres, setGenres] = useState([]);
  const { createBook, error } = useCreateBook();

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    try {
      await createBook({
        variables: {
          title: title.inputProperties.value,
          author: author.inputProperties.value,
          published: parseInt(published.value),
          genres,
        },
      });
      title.reset();
      published.reset();
      author.reset();
      genre.reset();
      setGenres([]);
    } catch (e) {
      console.error(e);
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.inputProperties.value));
    genre.reset();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title.inputProperties} />
        </div>
        <div>
          author
          <input {...author.inputProperties} />
        </div>
        <div>
          published
          <input {...published.inputProperties} />
        </div>
        <div>
          <input {...genre.inputProperties} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default NewBook;
