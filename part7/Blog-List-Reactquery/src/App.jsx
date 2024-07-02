import { useEffect, useRef } from 'react'
import { useUser } from './Reducers/userContext'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import LogOutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const togglableRef = useRef()
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
      <Notification />
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
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <LogOutButton />
          <BlogForm />
        </>
      )}
      <Blogs />
    </div>
  )
}

export default App
