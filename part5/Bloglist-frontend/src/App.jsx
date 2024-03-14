import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import LogOutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userBlogApp')
    if(loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      setUser(userLogged)
      blogService.setToken(userLogged.token)
      fetchBlogs()
    }
  }, [])

  const handleLogin = async({ username, password }) => {
    try {
      const res = await loginService.login({ 
        username, 
        password
      })

      window.localStorage.setItem(
        'userBlogApp', 
        JSON.stringify(res)
      )

      setUser(res)
      blogService.setToken(res.token)

    } catch (error) {
      handleNotification('Wrong username or password')
    }
  }

  const fetchBlogs = async() => {
    try{
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  const handleNotification = (message) => {
    setNotificationMessage(message)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <Notification message={notificationMessage} />

      {
      user === null 
        ? <LoginForm handleLogin={handleLogin} />
        : (
          <>
            <h2>blogs</h2>
            <p>{user.name} logged in</p> 
            <LogOutButton handleLogout={handleLogout}/>
            <BlogForm handleCreateBlog={handleCreateBlog} handleNotification={handleNotification} />
            <Blogs blogs={blogs} />
          </>
        )
      }
    </div>
  )
}

export default App
