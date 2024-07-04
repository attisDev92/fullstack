import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../redux/blogReducer'
import Togglable from './Togglable'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
        <form className='blog__form__container' onSubmit={handleOnSubmit}>
          <TextField
            id='title'
            type='text'
            label='Title'
            multiline
            maxRows={3}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          <TextField
            id='author'
            type='text'
            label='Author'
            multiline
            maxRows={3}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          <TextField
            id='url'
            type='text'
            label='URL'
            multiline
            maxRows={3}
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />

          <Button
            variant='outlined'
            color='success'
            type='submit'
            id='submit-new-blog'
          >
            create
          </Button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm
