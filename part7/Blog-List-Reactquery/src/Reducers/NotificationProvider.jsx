import { useReducer } from 'react'
import notificationReducer, { NotificationContext } from './notificationContext'

const notificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    mesagge: '',
    visible: false,
  })
  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default notificationProvider
