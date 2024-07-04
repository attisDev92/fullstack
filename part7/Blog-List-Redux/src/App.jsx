import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogsInit } from './redux/blogReducer'
import { setUser } from './redux/userReducer'
import { getUsers } from './redux/usersReducer'

import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import UserProfile from './components/UserProfile'
import BlogInfo from './components/BlogInfo'
import Menu from './components/Menu'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userBlogApp')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      dispatch(setUser(userLogged))
      dispatch(blogsInit())
      dispatch(getUsers())
    }
  }, [dispatch])

  return (
    <Container>
      <Menu user={user} />
      <h1>Blog App</h1>
      <Notification />
      <Routes>
        <Route
          path='/blogs'
          element={
            user ? (
              <>
                <BlogForm />
                <Divider textAlign='center' className='divider'>
                  Blogs
                </Divider>
                <Blogs />
              </>
            ) : (
              <div>You must log in to view this page</div>
            )
          }
        />
        <Route
          path='/blogs/:id'
          element={
            user ? <BlogInfo /> : <div>You must log in to view this page</div>
          }
        />
        <Route
          path='/users'
          element={
            user ? (
              <>
                <Divider textAlign='center' className='divider'>
                  Users
                </Divider>
                <Users />
              </>
            ) : (
              <div>You must log in to view this page</div>
            )
          }
        />
        <Route
          path='/users/:id'
          element={
            user ? (
              <UserProfile />
            ) : (
              <div>You must log in to view this page</div>
            )
          }
        />
        <Route
          path='/'
          element={
            user ? <Blogs /> : <div>You must log in to view this page</div>
          }
        />
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
    </Container>
  )
}

export default App
