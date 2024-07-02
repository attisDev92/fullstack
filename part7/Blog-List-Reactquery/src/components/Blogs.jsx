import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = () => {
  const compareLikes = (a, b) => b.likes - a.likes

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  const sortedBlogs = blogs ? blogs.sort(compareLikes) : []

  return (
    <div>
      {sortedBlogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
