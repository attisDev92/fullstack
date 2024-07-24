import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { LOGIN } from "../Graphql/userQueries";
import { USER } from "../Graphql/userQueries";
import { useEffect, useState } from "react";

export const useLogin = (setToken) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("books-app", token);
    }
  }, [result.data]); //eslint-disable-line

  return [login, result];
};


export const useUser = () => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const { loading, error, data } = useQuery(USER);

  useEffect(() => {
    if (data && data.me) {
      setFavoriteGenre(data.me.favoriteGenre);
    }
  }, [data]);

  return { loading, error, favoriteGenre };
};
