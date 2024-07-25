import { useField } from "../hooks/useField";
import { useLogin } from "../hooks/useUser";

const LoginForm = ({ setToken, show, setPage }) => {
  const username = useField();
  const password = useField();

  const [login] = useLogin(setToken);

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      variables: {
        username: username.inputProperties.value,
        password: password.inputProperties.value,
      },
    });
    setPage("books");
    username.reset();
    password.reset();
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={handleLogin}>
      username: <input {...username.inputProperties} />
      password: <input {...password.inputProperties} />
      <input type="submit" value="login" />
    </form>
  );
};

export default LoginForm;
