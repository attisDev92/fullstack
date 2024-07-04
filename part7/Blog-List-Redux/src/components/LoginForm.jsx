import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/userReducer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

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
    <form onSubmit={handleOnSubmit} className='login__form__container'>
      <TextField
        type='text'
        id='username'
        helperText='Please enter your username'
        label='USERNAME'
        onChange={({ target }) => setUsername(target.value)}
      />

      <TextField
        type='text'
        id='password'
        helperText='Please enter your password'
        label='PASSWORD'
        onChange={({ target }) => setPassword(target.value)}
      />

      <Button
        type='submit'
        variant='contained'
        color='success'
        id={'submit-login'}
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm
