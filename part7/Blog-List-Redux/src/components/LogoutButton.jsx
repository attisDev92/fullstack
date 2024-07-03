import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/userReducer'
import { useNavigate } from 'react-router-dom'

const LogOutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOnClick = () => {
    dispatch(removeUser())
    navigate('/')
  }

  return <button onClick={handleOnClick}>Logout</button>
}

export default LogOutButton
