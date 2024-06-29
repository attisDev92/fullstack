import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import blogServices from '../services/blogs'

const compareLikes = (a, b) => b.likes - a.likes

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newBlog (state, action) {
      state.push(action.payload)
      state.sort(compareLikes)
    },
    updateBlog (state, action) {
      const updatedBlog = action.payload
      const index = state.findIndex(blog => blog.id === updatedBlog.id)
      if (index !== -1) {
        state[index].likes = updatedBlog.likes
        state.sort(compareLikes)
      }
    },
    setBlogs (state, action) {
      return action.payload.sort(compareLikes)
    },
    destroyBlog (state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id).sort(compareLikes)
    }
  }
})

export const { newBlog, updateBlog, setBlogs, destroyBlog } = blogsSlice.actions

export const createBlog = (blogToCreate, user) => {
  return async (dispatch) => {
    try {
      const blog = await blogServices.create(blogToCreate)
      const blogUpdated = { ...blog, user }
      dispatch(newBlog(blogUpdated))
      dispatch(setNotification(`you have created an ${blog.title} by ${blog.author}`))
    } catch (error) {
      console.error(error)
      dispatch(setNotification( 'bad request, the blog information is wrong or incomplete'))
    }
  }
}

export const likeBlog = (blog) => {
  const blogToUpdate = { ...blog, likes: blog.likes + 1 }
  return async (dispatch) => {
    try {
      const updatedBlog = await blogServices.update(blog.id, blogToUpdate)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification(`you liked the blog ${updatedBlog.title}`))
    } catch(error) {
      console.error(error)
      dispatch(setNotification())
    }
  }
}

export const blogsInit = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogServices.destroy(id)
      dispatch(destroyBlog(id))
      dispatch(setNotification('you deleted a blog'))
    } catch (error) {
      console.error(error)
      dispatch(setNotification())
    }
  }
}

export default blogsSlice.reducer
