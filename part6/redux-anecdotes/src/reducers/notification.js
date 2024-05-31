import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {

    notificationVote (state, action) {
      const anecdote = action.payload
      const notificationMassege = `you voted for ${anecdote}`
      return notificationMassege
    },

    notificationNewAnecdote (state, action) {
      const anecdote = action.payload
      const notificationMassege = `you create ${anecdote}`
      return notificationMassege
    }

  }
})

export const { notificationVote, notificationNewAnecdote } = notificationSlice.actions

export default notificationSlice.reducer