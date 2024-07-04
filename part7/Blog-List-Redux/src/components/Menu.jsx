import { Link } from 'react-router-dom'
import { useRef } from 'react'
import LogOutButton from './LogoutButton'
import LoginForm from './LoginForm'
import Togglable from './Togglable'

const Menu = ({ user }) => {
  const togglableRef = useRef()
  return (
    <nav className='menu'>
      <Link to='/'>Home</Link>
      <Link to='/users'>Users</Link>
      <Link to='/blogs'>Blogs</Link>
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
          <p>{user.name} logged in</p>
          <LogOutButton />
        </>
      )}
    </nav>
  )
}

export default Menu
