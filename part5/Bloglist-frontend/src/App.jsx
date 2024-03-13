import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'


import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {

  const [user, setUser] = useState(null)

  const handleLogin = async({ username, password }) => {

    try {
      const res = await loginService.login({ username, password })
      setUser(res)
      blogService.setToken(res.token)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>

      {
        user === null 
          ? <LoginForm handleLogin={handleLogin} />
          : <Blogs user={user}/>
      }
    
    </div>
  )
}

export default App
