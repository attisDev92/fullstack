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

export default Blogs