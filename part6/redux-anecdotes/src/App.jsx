import { useSelector, useDispatch } from 'react-redux'
import  { incrementVote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleCreateAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(incrementVote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      )}

      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App