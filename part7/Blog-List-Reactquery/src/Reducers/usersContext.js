import { createContext, useContext } from 'react'

export const UsersContext = createContext()

const usersReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.payload
  default:
    return state
  }
}

export default usersReducer

export const useUsers = () => useContext(UsersContext)