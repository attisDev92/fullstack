import PropTypes from 'prop-types'

const LogOutButton = ({ handleLogout }) => {

  const handleOnClick = () => { 
    window.localStorage.removeItem('userBlogApp')
    handleLogout()
  }

  return(
    <button onClick={handleOnClick}>
      Logout
    </button>
  )
}

LogOutButton.propTypes = {
  handleLogout: PropTypes.func.isRequired
}

export default LogOutButton