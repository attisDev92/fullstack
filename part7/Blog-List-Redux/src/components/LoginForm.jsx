import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleOnSubmit = e => {
    e.preventDefault()
    const credentiasls = { username, password }
    dispatch(loginUser(credentiasls)).then(() => {
      setPassword('')
      setUsername('')
    })
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
