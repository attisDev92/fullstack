import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'


import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import LogOutButton from './components/LogoutButton'

const App = () => {

  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userBlogApp')
    if(loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      setUser(userLogged)
      blogService.setToken(userLogged.token)
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
      console.error(error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>

      {
        user === null 
        ? <LoginForm handleLogin={handleLogin} />
        : (
          <>
            <h2>blogs</h2>
            <p>{user.name} logged in</p> 
            <LogOutButton handleLogout={handleLogout}/>
            <Blogs user={user} />
          </>
        )
      }

    </div>
  )
}

export default App
