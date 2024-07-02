import { useState, useRef } from 'react'
import blogService from '../services/blogs'

import Togglable from './Togglable'
import { useNotification } from '../Reducers/notificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const blogTogglableRef = useRef()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: newBlog => {
      queryClient.invalidateQueries(['blogs'])
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `You create a new blog ${newBlog.title} by ${newBlog.author}`,
      })
    },
  })

  const handleOnSubmit = async e => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    createBlogMutation.mutate(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    blogTogglableRef.current.toggleVisibility()
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
