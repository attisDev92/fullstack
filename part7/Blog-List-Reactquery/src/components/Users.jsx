import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'
import User from './User'
import { useUsers } from '../Reducers/usersContext'

const Users = () => {
  const { dispatch } = useUsers()

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: 2,
  })

  useEffect(() => {
    if (users) {
      dispatch({ type: 'SET_USERS', payload: users })
    }
  }, [users, dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Users</th>
          <th>Blogs created</th>
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
