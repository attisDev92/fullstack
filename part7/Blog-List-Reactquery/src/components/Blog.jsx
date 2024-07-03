import Togglable from './Togglable'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../Reducers/notificationContext'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: blogUpdated => {
      queryClient.invalidateQueries(['blogs'])
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `you liked the blog ${blogUpdated.title}`,
      })
    },
  })

  const handleOnClick = () => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlogMutation.mutate(blogToUpdate)
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.destroy,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'you deleted a blog',
      })
    },
  })

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Remove the blog ${blog.title} by ${blog.author}`,
    )
    if (confirmDelete) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div className='container__blog'>
      <h4>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
      </h4>
      <p>Author: {blog.author}</p>

      <Togglable buttonLabel1='view' buttonLabel2='hide'>
        <ul>
          <li>URL: {blog.url}</li>
          <li>
            Likes: {blog.likes}
            <button onClick={handleOnClick}>like</button>
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
