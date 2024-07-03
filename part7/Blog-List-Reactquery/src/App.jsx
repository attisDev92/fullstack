import { useEffect } from 'react'
import { useUser } from './Reducers/userContext'
import { Routes, Route, Link } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import LogOutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import UserProfile from './components/UserProfile'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const { state, dispatch } = useUser()
  const user = state

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userBlogApp')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'SET_USER',
        payload: userLogged,
      })
    }
  }, [dispatch])

  return (
    <div>
      <h1>Blog App</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/blogs'>Blogs</Link>
        <Link to='/users'>Users</Link>
        {user ? (
          <>
            <p>{user.name} logged in</p>
            <LogOutButton />
          </>
        ) : (
          <Link to='/login'>LogIn</Link>
        )}
      </nav>
      <Notification />
      <Routes>
        <Route
          path='/blogs'
          element={
            <>
              <h2>Blogs</h2>
              <BlogForm />
              <Blogs />
            </>
          }
        />
        <Route path='/blogs/:id' element={<BlogInfo />} />
        <Route
          path='/users'
          element={
            <>
              <h2>Users</h2>
              <Users />
            </>
          }
        />
        <Route path='/users/:id' element={<UserProfile />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<Blogs />} />
      </Routes>
    </div>
  )
}

export default App
