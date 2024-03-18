import { useState } from "react"
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const credentials = {
      username,
      password
    }

    handleLogin(credentials)
    setPassword('')
    setUsername('')
  }

  return (
    <form onSubmit={handleOnSubmit}>

      <h2>Log in to application</h2>

      <label>username: </label>
      <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
      <br />

      <label>password: </label>
      <input type='text' value={password} onChange={({ target }) => setPassword(target.value)}/>
      <br />

      <button>login</button>

    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm