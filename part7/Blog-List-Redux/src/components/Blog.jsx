import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../redux/blogReducer'
import Togglable from './Togglable'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleOnClickLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id))
  }

  return (
    <Card className='card__blog'>
      <h4>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
      </h4>
      <p>Author: {blog.author}</p>

      <Togglable buttonLabel1='view' buttonLabel2='hide'>
        <ul>
          <li>URL: {blog.url}</li>
          <li>Likes: {blog.likes}</li>
          <Button variant='contained' onClick={handleOnClickLike}>
            like
          </Button>
          <li>User: {blog.user.name}</li>
        </ul>

        <Button variant='contained' onClick={handleDelete}>
          Delete
        </Button>
        <br />
      </Togglable>
    </Card>
  )
}

export default Blog
