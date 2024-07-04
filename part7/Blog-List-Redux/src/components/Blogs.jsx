import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      {
        <div className='container__blogs'>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      }
    </>
  )
}

export default Blogs
