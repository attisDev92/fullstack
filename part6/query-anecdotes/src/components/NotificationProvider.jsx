import notificationReducer from "../notificationContext"
import { useReducer } from "react"
import { NotificationContext } from "../notificationContext"

const notificationProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(notificationReducer, { message: '', visible: false })

  return (
    <NotificationContext.Provider value={{ state, dispatch }} >
      {children}
    </NotificationContext.Provider>
  )
}

export default notificationProvider