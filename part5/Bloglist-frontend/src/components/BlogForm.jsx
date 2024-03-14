import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleOnSubmit = async(e) => {

    e.preventDefault()
    
    const newBlog = {
      title,
      author,
      url
    }

    const res = await blogService.create(newBlog)
    handleCreateBlog(res)
    
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleOnSubmit}>
      
      <legend>Create new</legend>

      <label>Title: </label>
      <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
      <br />

      <label>Author: </label>
      <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
      <br />

      <label>url: </label>
      <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
      <br />

      <button>create</button>

    </form>    
  )
}

export default BlogForm