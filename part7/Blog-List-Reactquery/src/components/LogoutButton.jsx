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

export default LogOutButton