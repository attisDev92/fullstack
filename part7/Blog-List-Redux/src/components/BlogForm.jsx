import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../redux/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogTogglableRef = useRef()

  const handleOnSubmit = e => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }

    dispatch(createBlog(newBlog, user)).then(() => {
      setTitle('')
      setAuthor('')
      setUrl('')
      blogTogglableRef.current.toggleVisibility()
    })
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
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />

          <label>Author: </label>
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />

          <label>url: </label>
          <input
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />

          <button id='submit-new-blog'>create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm
