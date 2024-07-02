import { createContext, useContext } from 'react'
import blogService from '../services/blogs'

export const UserContext = createContext()

const userReducer = (state, action) => {

  if (action.type ===  'SET_USER') {
    const { token } = action.payload
    blogService.setToken(token)
    return action.payload
  } else if (action.type === 'LOGOUT_USER') {
    blogService.setToken(null)
    window.localStorage.removeItem('userBlogApp')
    return null
  } else { 
    return state  
  }

}

export default userReducer
export const useUser = () => useContext(UserContext)