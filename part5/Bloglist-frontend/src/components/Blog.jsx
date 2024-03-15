import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  
  return (
    <div>
      <h4>{blog.title} </h4> <Togglable 
        buttonLabel1="view"
        buttonLabel2="hide"
      >
      <p>
        Author: {blog.author} <br />
        URL: {blog.url} <br />
        Likes: {blog.likes}
        <button>like</button>
      </p>

      </Togglable>
      <hr />

    </div>  
  )
}
  
export default Blog