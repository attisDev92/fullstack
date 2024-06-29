import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    active: false
  },
  reducers: {
    activeNotification (state, action) {
      if(action.payload) {
        state.message = action.payload
        state.active = true
      } else {
        state.message = 'An error has occurred, please try again later'
        state.active = true
      }
    },
    desactiveNotification (state) {
      state.message = ''
      state.active = false
    }
  }
})

export const { activeNotification, desactiveNotification } = notificationSlice.actions

export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(activeNotification(message))
    setTimeout(() => {
      dispatch(desactiveNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer