import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: 'none',
  message: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {

    setNotificationVote (state, action) {
      const anecdote = action.payload
      state.display = 'block'
      state.message = `you voted for ${anecdote}`
    },

    setNotificationNewAnecdote (state, action) {
      const anecdote = action.payload
      state.display = 'block'
      state.message = `you create a new anecdote: ${anecdote}`
    },

    clearNotification (state, action) {
      state.display = 'none'
      state.message = ''
    }

  }
})

export const { setNotificationVote, setNotificationNewAnecdote, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer