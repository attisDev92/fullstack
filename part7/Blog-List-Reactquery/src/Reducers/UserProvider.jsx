import { useReducer } from 'react'
import userReducer, { UserContext } from './userContext'

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
