import { useSelector } from 'react-redux'
import User from './User'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <TableContainer component={Paper} className='users__container'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Users</TableCell>
            <TableCell align='center'>Blogs created</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
