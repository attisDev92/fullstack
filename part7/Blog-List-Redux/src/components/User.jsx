import { Link } from 'react-router-dom'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell align='center'>{user.name}</TableCell>
      <TableCell align='center'>{user.blogs.length}</TableCell>
      <TableCell align='center'>
        {' '}
        <Link to={`/users/${user.id}`}>SHOW PROFILE</Link>
      </TableCell>
    </TableRow>
  )
}

export default User
