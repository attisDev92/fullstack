import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog } from '../redux/blogReducer'

const BlogInfo = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const path = window.location.pathname
  const parts = path.split('/')
  const blogId = parts[parts.length - 1]
  const blog = blogs.find(blog => blog.id === blogId)

  const handleOnClickLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <>
      <h4>{blog.title} </h4>
      <p>Author: {blog.author}</p>
      <ul>
        <li>URL: {blog.url}</li>
        <li>
          Likes: {blog.likes}
          <button onClick={handleOnClickLike}>like</button>
        </li>
        <li>User: {blog.user.name}</li>
      </ul>
      <Link to='/blogs'>back</Link>
    </>
  )
}

export default BlogInfo
