import { useState } from 'react'
import {
  Routes,
  Route,
  useMatch
} from 'react-router-dom'

import About from './components/About'
import AnecdoteList from './components/Anecdotes'
import CreateNew from './components/Create'
import Anecdote from './components/Anecdote'
import Menu from './components/Menu'
import Footer from './components/Footer'


const App = () => {

  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`you create ${anecdote.content}`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <p>{notification}</p>

      <Routes>
        <Route 
          path='/about' 
          element={<About />} 
        />
        <Route 
          path='/create' 
          element={<CreateNew addNew={addNew} />} 
        />
        <Route 
          path='/:id'
          element={<Anecdote anecdote={anecdote} voteFn={vote} />}
        />
        <Route 
          path='/' 
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
      </Routes>

      <Footer />
      
    </div>
  )
}

export default App
