import { configureStore } from '@reduxjs/toolkit'
import blogs from './redux/blogReducer'
import notification from './redux/notificationReducer'
import user from './redux/userReducer'
import users from './redux/usersReducer'

const store = configureStore({
  reducer: {
    blogs,
    notification,
    user,
    users
  }
})

export default store