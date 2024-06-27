import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = e => {
    e.preventDefault()

    const credentials = {
      username,
      password,
    }

    handleLogin(credentials)
    setPassword('')
    setUsername('')
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <h2>Log in to application</h2>

      <label>username: </label>
      <input
        type='text'
        id={'username'}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />

      <label>password: </label>
      <input
        type='text'
        id={'password'}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />

      <button id={'submit-login'}>login</button>
    </form>
  )
}

export default LoginForm
