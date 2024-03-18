import PropTypes from 'prop-types'
import Blog from './Blog'

const Blogs = ({ blogs, handleUpdateBlog, handleDeleteBlog }) => {

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  const sortedBlogs = blogs.sort(compareLikes)

    return (
      <>      
        {<div>
          {sortedBlogs.map(blog => (
            <Blog 
              key={blog.id} 
              blog={blog} 
              handleUpdateBlog={handleUpdateBlog} 
              handleDeleteBlog={handleDeleteBlog}
            />
          ))}
        </div>}
      </>
    )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}

export default Blogs