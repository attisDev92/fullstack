import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import anecdoteServices from './services/anecdotes'
import { useDispatch } from 'react-redux' 
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteServices
      .getAll()
      .then( anecdotes => {
        dispatch(setAnecdotes(anecdotes))  
      })
  }, [])

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App