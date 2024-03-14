import { useEffect, useState } from "react"
import blogServices from '../services/blogs'

import Blog from './Blog'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
      fetchBlogs()
    }, [])

    const fetchBlogs = async() => {
      const blogs = await blogServices.getAll()
      setBlogs(blogs)
    }

    return (
      <>      
        {
          blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))
        }
      </>
    )
}

export default Blogs