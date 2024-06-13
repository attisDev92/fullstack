import { createContext, useContext } from "react";

export const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload, visible: true }
    case 'CLEAR_NOTIFICATION':
      return { ...state, visible: false }
    default:
      return state
  }
}

export default notificationReducer

export const useNotification = () => useContext(NotificationContext)
