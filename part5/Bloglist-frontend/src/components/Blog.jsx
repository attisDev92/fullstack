import Togglable from "./Togglable"

const Blog = ({ blog }) => {

  return (
    <div>
      <h4>{blog.title} </h4> <Togglable 
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
        </li> 
        <li>
          User: {blog.user.name}  
        </li>
        <button>like</button>
      </ul>

      </Togglable>
      <hr />

    </div>  
  )
}
  
export default Blog