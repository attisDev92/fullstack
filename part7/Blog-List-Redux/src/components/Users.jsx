import { useSelector } from 'react-redux'
import User from './User'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <table>
      <thead>
        <tr>
          <td>Users</td>
          <td>Blogs created</td>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  )
}

export default Users
