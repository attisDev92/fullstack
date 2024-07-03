import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const users = useSelector(state => state.users)
  const userLogged = useSelector(state => state.user)
  const navigate = useNavigate()
  const path = window.location.pathname
  const parts = path.split('/')
  const userId = parts[parts.length - 1]
  const user = users.find(user => user.id === userId)

  useEffect(() => {
    if (!userLogged || !user) {
      navigate('/')
    }
  })

  return (
    <>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      <Link to='/users'>Back</Link>
    </>
  )
}

export default UserProfile
