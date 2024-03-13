import { useEffect, useState } from "react"
import blogServices from '../services/blogs'

import Blog from './Blog'

const Blogs = ({ user }) => {
    const [blogs, setBlogs] = useState([])

    useEffect( async() => {
      const blogs = await blogServices.getAll()
      setBlogs(blogs)
    } ,[])

    return (
      <>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {
          blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))
        }
      </>
    )
}

export default Blogs