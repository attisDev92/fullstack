import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser (state, action) {
      blogService.setToken(action.payload.token)
      return  action.payload
    },
    removeUser () {
      window.localStorage.removeItem('userBlogApp')
      return null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await loginService.login({ username, password })
      window.localStorage.setItem('userBlogApp', JSON.stringify(response))
      dispatch(setUser(response))
    } catch (error) {
      console.error(error)
      dispatch(setNotification('Wrong username or password'))
    }
  }
}

export default userSlice.reducer