import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/userReducer'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

const LogOutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOnClick = () => {
    dispatch(removeUser())
    navigate('/')
  }

  return (
    <Button variant='outlined' color='error' onClick={handleOnClick}>
      Logout
    </Button>
  )
}

export default LogOutButton
