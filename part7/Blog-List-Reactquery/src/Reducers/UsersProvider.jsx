import { useReducer } from 'react'
import usersReducer, { UsersContext } from './usersContext'

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, null)

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersProvider
