import { createSlice } from "@reduxjs/toolkit"

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    createAnecdote (state, action) {
      const content = action.payload
      const newNoteObject = {
        content,
        id: getId(),
        votes: 0
      }
      state.push(newNoteObject)
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


export default anecdotesSlice.reducer