import { useDispatch } from 'react-redux'
import { setNotification} from '../reducers/notificationReducer'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleCreateAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(newAnecdote(content)).then(() => {
      dispatch(setNotification({ message: `you create a new anecdote: "${content}"`, time: 1000 }))
    })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm