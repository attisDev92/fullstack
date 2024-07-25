import { useMutation, useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { useState, useEffect } from "react";
import { ALL_BOOKS, CREATE_BOOK } from "../Graphql/booksQueries";
import { ALL_AUTHORS } from "../Graphql/authorQueries";
import { BOOK_ADDED } from "../Graphql/subscriptions";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState(null);
  const [booksGenres, setBooksGenres] = useState([]);

  const client = useApolloClient(); 

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : {},
  });

  // Update the cache when a new book is added
  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: genre ? { genre } : {},
    });

    if (dataInStore && !dataInStore.allBooks.find((b) => b.id === addedBook.id)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: genre ? { genre } : {},
        data: { allBooks: [...dataInStore.allBooks, addedBook] },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert('new book')
      updateCacheWith(addedBook);
    },
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

  return {
    error,
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

export const useCreateBook = () => {
  const [createBook, { error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update(cache, {data: {addedBook}}) {
      const {allBooks} = cache.readQuery({ query: ALL_BOOKS})
      cache.writeQuery({
        query: ALL_BOOKS,
        data: {allBooks: allBooks.concat(addedBook)},
      })
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    createBook,
    error,
  };
};
