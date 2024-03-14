import { useEffect, useState } from "react"
import blogServices from '../services/blogs'

import Blog from './Blog'

const Blogs = ({ blogs }) => {

    return (
      <>      
        {<div>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>}
      </>
    )
}

export default Blogs