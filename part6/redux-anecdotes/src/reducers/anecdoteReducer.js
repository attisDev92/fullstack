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
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
      return state.sort((a, b) => b.votes - a.votes)
    },

    setAnecdotes (state, action) {
      return action.payload
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

export default anecdotesSlice.reducer