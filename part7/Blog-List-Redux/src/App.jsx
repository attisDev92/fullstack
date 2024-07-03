import { useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogsInit } from './redux/blogReducer'
import { setUser } from './redux/userReducer'
import { getUsers } from './redux/usersReducer'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import LogOutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserProfile from './components/UserProfile'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const togglableRef = useRef()
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
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/users'>Users</Link>
        <Link to='/blogs'>Blogs</Link>
        {user === null ? (
          <Togglable
            buttonLabel1={'Login'}
            buttonLabel2={'Cancelar'}
            ref={togglableRef}
          >
            <LoginForm />
          </Togglable>
        ) : (
          <>
            <p>{user.name} logged in</p>
            <LogOutButton />
          </>
        )}
      </nav>
      <h1>Blog App</h1>
      <Notification />
      <Routes>
        <Route
          path='/blogs'
          element={
            user ? (
              <>
                <h2>Blogs</h2>
                <BlogForm />
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
                <h2>Users</h2>
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
    </div>
  )
}

export default App
