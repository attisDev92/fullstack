import Togglable from "./Togglable"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog }) => {

  const handleOnClick = async() => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const response = await blogService.update(blog.id, blogToUpdate)
      const blogUpdated = {
        ...response,
        user: blogToUpdate.user
      }
      handleUpdateBlog(blogUpdated)

    } catch (error) {
      console.error(error)
    }
    
  }

  const handleDelete = async() => {
    
    const confirmDelete = window.confirm(`Remove the blog ${blog.title} by ${blog.author}`)
    
    try {
      if(confirmDelete) {
        const response = await blogService.destroy(blog.id)
        console.log(response)
        handleDeleteBlog(blog)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h4>{blog.title} </h4> 
      
      <Togglable 
        buttonLabel1="view"
        buttonLabel2="hide"
      >
      <ul>
        <li>
          Author: {blog.author} 
        </li>
        <li>
          URL: {blog.url} 
        </li>
        <li>
          Likes: {blog.likes}
          <button onClick={handleOnClick}>
            like
          </button>
        </li> 
        <li>
          User: {blog.user.name}  
        </li>
      </ul>
      <button onClick={handleDelete}>Delete</button> <br />

      </Togglable>
      <hr />

    </div>  
  )
}

Blog.protoTypes = {
  blog: PropTypes.object.isRequired, 
  handleUpdateBlog: PropTypes.func.isRequired, 
  handleDeleteBlog: PropTypes.func.isRequired
}
  
export default Blog