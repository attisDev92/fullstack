import { useUser } from '../Reducers/userContext'

const LogOutButton = () => {
  const { dispatch } = useUser()

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT_USER',
      payload: null,
    })
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default LogOutButton
