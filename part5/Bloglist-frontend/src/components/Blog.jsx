import Togglable from "./Togglable"
import blogService from '../services/blogs'

const Blog = ({ blog, handleUpdateBlog }) => {

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
      console.log(error)
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

      </Togglable>
      <hr />

    </div>  
  )
}
  
export default Blog