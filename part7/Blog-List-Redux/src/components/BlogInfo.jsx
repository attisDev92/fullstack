import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, addCommentBlog } from '../redux/blogReducer'
import { useState } from 'react'

const BlogInfo = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const [inputComment, setInputComment] = useState('')
  const path = window.location.pathname
  const parts = path.split('/')
  const blogId = parts[parts.length - 1]
  const blog = blogs.find(blog => blog.id === blogId)

  const handleOnClickLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleSubmitComment = e => {
    e.preventDefault()
    dispatch(addCommentBlog(blog, inputComment)).then(() => {
      setInputComment('')
    })
  }

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <>
      <h4>{blog.title}</h4>
      <p>Author: {blog.author}</p>
      <ul>
        <li>URL: {blog.url}</li>
        <li>
          Likes: {blog.likes}
          <button onClick={handleOnClickLike}>like</button>
        </li>
        <li>User: {blog.user ? blog.user.name : 'Unknown'}</li>
      </ul>
      <h3>Comments</h3>
      <form onSubmit={handleSubmitComment}>
        <input
          type='text'
          value={inputComment}
          onChange={({ target }) => setInputComment(target.value)}
        />
        <button>add comment</button>
      </form>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <div>No comments yet</div>
      )}
      <Link to='/blogs'>back</Link>
    </>
  )
}

export default BlogInfo
