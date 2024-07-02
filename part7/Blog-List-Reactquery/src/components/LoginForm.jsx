import { useState } from 'react'
import userService from '../services/login'
import { useUser } from '../Reducers/userContext'
import { useNotification } from '../Reducers/notificationContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useUser().dispatch
  const setNotification = useNotification().dispatch

  const handleLogin = async e => {
    e.preventDefault()
    const credentials = {
      username,
      password,
    }
    try {
      const user = await userService.login(credentials)
      setPassword('')
      setUsername('')
      window.localStorage.setItem('userBlogApp', JSON.stringify(user))
      setUser({
        type: 'SET_USER',
        payload: user,
      })
    } catch (error) {
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: 'Wrong username or password',
      })
    }
  }

  return (
    <form onSubmit={handleLogin}>
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
