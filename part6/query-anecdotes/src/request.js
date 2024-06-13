import axios from 'axios'
const DBurl = 'http://localhost:3001/anecdotes'

const generateId = () => Math.floor(Math.random() * 100000)

export const getAnecdotes = () => {
  return axios.get(DBurl)
    .then((res) => res.data)
}

export const createNew = (content) => {
  const newAnecdote = {
    content,
    id: generateId(),
    votes: 0,
  }
  return axios.post(DBurl, newAnecdote)
    .then(res => res.data)
}

export const updateAnecdote = (anecdote) => {
  const id = anecdote.id
  const newAnecdote = {
    content: anecdote.content,
    id,
    votes: anecdote.votes + 1
  }
  return axios.put(`${DBurl}/${id}`, newAnecdote)
    .then(res => res.data)
}