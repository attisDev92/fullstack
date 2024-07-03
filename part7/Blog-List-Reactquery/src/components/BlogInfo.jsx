import blogService from '../services/blogs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../Reducers/notificationContext'

const BlogInfo = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()
  const path = window.location.pathname
  const parts = path.split('/')
  const blogId = parts[parts.length - 1]

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => blogService.getBlog(blogId),
    retry: 2,
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: blogUpdated => {
      queryClient.invalidateQueries(['blog'])
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `You liked the blog "${blogUpdated.title}"`,
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='container__blog'>
      <h4>{blog.title}</h4>
      <p>Author: {blog.author}</p>
      <ul>
        <li>URL: {blog.url}</li>
        <li>
          Likes: {blog.likes}
          <button onClick={handleOnClick}>like</button>
        </li>
        <li>User: {blog.user.name}</li>
      </ul>
    </div>
  )
}

export default BlogInfo
