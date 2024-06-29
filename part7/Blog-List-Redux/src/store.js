import { configureStore } from '@reduxjs/toolkit'
import blogs from './redux/blogReducer'
import notification from './redux/notificationReducer'
import user from './redux/userReducer'

const store = configureStore({
  reducer: {
    blogs,
    notification,
    user
  }
})

export default store