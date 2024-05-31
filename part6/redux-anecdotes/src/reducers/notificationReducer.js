import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  message: '',
  time: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {

    setNotification (state, action) {
      state.active = true
      state.message = action.payload.message
      state.time = action.payload.time
    },

    clearNotification (state, action) {
      state.active = false
      state.message = ''
      state.time = 0
    }

  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer