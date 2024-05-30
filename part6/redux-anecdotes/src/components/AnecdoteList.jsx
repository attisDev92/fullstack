import { useSelector, useDispatch } from 'react-redux'
import  { incrementVote } from '../reducers/anecdoteReducer'
import { useEffect, useState } from 'react'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const [ anecdotesList, setAnecdotesList ] = useState([]) 

  useEffect(() => {
    setAnecdotesList (filter === '' 
      ? anecdotes
      : anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase()) 
      )
    )
  }, [anecdotes, filter])
  

  return (
    <>
      {anecdotesList.map(anecdote =>
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
    </>
  )
}

export default AnecdoteList