import { useState, useRef} from "react"
import blogService from '../services/blogs'

import Togglable from "./Togglable"

const BlogForm = ({ user, handleCreateBlog, handleNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogTogglableRef = useRef()

  const handleOnSubmit = async(e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try{
      const res = await blogService.create(newBlog)
      const blog = {
        ...res,
        user: {
          name: user.name
        },
      }
      handleCreateBlog(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
      handleNotification(`${res.title} by ${res.author} was created`)
      blogTogglableRef.current.toggleVisibility()
    }catch (error) {
      handleNotification('bad request, the blog information is wrong or incomplete')
    }
  }

  return (
    <div>
      <h3>Create new</h3>

      <Togglable 
        buttonLabel1={'add new blog'}
        buttonLabel2={'cerrar'} 
        ref={blogTogglableRef} 
      >
    
        <form onSubmit={handleOnSubmit}>

            <label>Title: </label>
            <input 
              type="text" 
              value={title} 
              onChange={({ target }) => setTitle(target.value)} 
            />
            <br />

            <label>Author: </label>
            <input 
              type="text" 
              value={author} 
              onChange={({ target }) => setAuthor(target.value)} 
            />
            <br />

            <label>url: </label>
            <input 
              type="text" 
              value={url} 
              onChange={({ target }) => setUrl(target.value)} 
            />
            <br />

            <button>create</button>
        </form> 

      </Togglable>
    </div>
  )
}

export default BlogForm