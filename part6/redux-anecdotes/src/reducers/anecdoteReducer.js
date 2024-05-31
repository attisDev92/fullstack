import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    createAnecdote (state, action) {
      state.push(action.payload)
      return state.sort((a, b) => b.votes - a.votes)
    },

    incrementVote (state, action) {
      const updatedAnecdote = action.payload
      return state
        .map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
        .sort((a, b) => b.votes - a.votes)
    },

    setAnecdotes (state, action) {
      const anecdotes = action.payload
      return anecdotes.sort((a, b) => b.votes - a.votes)
    }

  }
})

export const { createAnecdote, incrementVote, setAnecdotes } = anecdotesSlice.actions

export const anecdotesInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteServices.createAnecdote(content)
    dispatch(createAnecdote(anecdote))
  }
}

export const addVote = (id) => {
  return async (dispatch) => {
    const anecdoteUpdated = await anecdoteServices.updateVote(id)
    dispatch(incrementVote(anecdoteUpdated))
  }
}

export default anecdotesSlice.reducer