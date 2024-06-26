import axios from 'axios'

const DBurl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(DBurl)
  return res.data
}

const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    id: getId(),
    votes: 0
  }
  const res = await axios.post(DBurl, newAnecdote)
  return res.data
}

const updateVote = async (id) => {
  const anecdotes = await getAll()
  const anecdoteToUpdate = anecdotes.find(anecdote => 
    anecdote.id === id
  )
  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1 
  }

  const res = await axios.put(`${DBurl}/${id}`, updatedAnecdote)
  return res.data
} 

export default {
  getAll,
  createAnecdote,
  updateVote
}