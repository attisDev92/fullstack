import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../redux/blogReducer'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleOnClickLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id))
  }

  return (
    <div className='container__blog'>
      <h4>{blog.title} </h4>
      <p>Author: {blog.author}</p>

      <Togglable buttonLabel1='view' buttonLabel2='hide'>
        <ul>
          <li>URL: {blog.url}</li>
          <li>
            Likes: {blog.likes}
            <button onClick={handleOnClickLike}>like</button>
          </li>
          <li>User: {blog.user.name}</li>
        </ul>

        <button onClick={handleDelete}>Delete</button>
        <br />
      </Togglable>
      <hr />
    </div>
  )
}

export default Blog
