import { useField } from "../hooks/useField";
import { useLogin } from "../hooks/useUser";

const LoginForm = ({ setToken, show, setPage }) => {
  const usernameInput = useField();
  const username = { ...usernameInput, reset: "__" };
  const passwordInput = useField();
  const password = { ...passwordInput, reset: "__" };

  const [login] = useLogin(setToken);

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      variables: { username: username.value, password: password.value },
    });
    setPage("books");
    usernameInput.reset();
    passwordInput.reset();
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={handleLogin}>
      username: <input {...username} />
      password: <input {...password} />
      <input type="submit" value="login" />
    </form>
  );
};

export default LoginForm;
