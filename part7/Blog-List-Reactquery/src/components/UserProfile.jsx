import { Link } from 'react-router-dom'
import { useUsers } from '../Reducers/usersContext'

const UserProfile = () => {
  const { state } = useUsers()
  const path = window.location.pathname
  const parts = path.split('/')
  const userId = parts[parts.length - 1]
  const users = state

  const user = users.find(user => user.id === userId)

  if (!user) {
    return (
      <>
        <div>{'The profile does not exist'}</div>
        <Link to='/'>back</Link>
      </>
    )
  }

  if (user.blogs.length === 0) {
    return (
      <>
        <div>{'The user does not have blogs'}</div>
        <Link to='/'>back</Link>
      </>
    )
  }

  return (
    <>
      <h2>{user.name}</h2>
      <p>Added blogs</p>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      <Link to='/'>back</Link>
    </>
  )
}

export default UserProfile
