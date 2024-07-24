import { useState } from "react";
import { useField } from "../hooks/useField";
import { useBooks } from "../hooks/useBooks";

const NewBook = ({ show }) => {
  const titleInput = useField();
  const title = { ...titleInput, reset: "__" };
  const authorInput = useField();
  const author = { ...authorInput, reset: "__" };
  const publishedInput = useField("number", 0);
  const published = { ...publishedInput, reset: "__" };
  const genreInput = useField();
  const genre = { ...genreInput, reset: "__" };
  const [genres, setGenres] = useState([]);
  const { createBook, mutationError } = useBooks();

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    try {
      await createBook({
        variables: {
          title: title.value,
          author: author.value,
          published: parseInt(published.value),
          genres,
        },
      });
      titleInput.reset();
      publishedInput.reset();
      authorInput.reset();
      genreInput.reset();
      setGenres([]);
    } catch (e) {
      console.error(e);
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    genreInput.reset();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
      {mutationError && <p>Error: {mutationError.message}</p>}
    </div>
  );
};

export default NewBook;
