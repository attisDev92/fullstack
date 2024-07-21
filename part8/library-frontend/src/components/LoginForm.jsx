import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useEffect, useState } from "react";

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setPage("books");
    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={handleLogin}>
      username:{" "}
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      password:{" "}
      <input
        type="text"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <input type="submit" value="login" />
    </form>
  );
};

export default LoginForm;
