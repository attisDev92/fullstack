import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { ALL_BOOKS, CREATE_BOOK } from "../Graphql/booksQueries";
import { ALL_AUTHORS } from "../Graphql/authorQueries";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState(null);
  const [booksGenres, setBooksGenres] = useState([]);

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : {},
  });

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks);
      const allGenres = data.allBooks.reduce((totalGenres, book) => {
        return totalGenres.concat(book.genres);
      }, []);
      setBooksGenres([...new Set(allGenres)]);
    }
  }, [data]);

  const [createBook, { error: mutationError }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    createBook,
    queryError: error,
    mutationError,
    loading,
    books,
    booksGenres,
    setGenre,
    refetch,
  };
};

export const useBooksByGenre = (genre) => {
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre, // Skip query if genre is null
  });

  const books = data ? data.allBooks : [];

  return { loading, error, books };
};