import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/userReducer'

const LogOutButton = () => {
  const dispatch = useDispatch()
  const handleOnClick = () => {
    dispatch(removeUser())
  }

  return <button onClick={handleOnClick}>Logout</button>
}

export default LogOutButton
