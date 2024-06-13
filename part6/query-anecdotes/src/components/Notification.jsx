import { useState, useEffect,  } from 'react'
import { useNotification } from '../notificationContext'

const Notification = () => {
  const { state, dispatch } = useNotification()
  const [ notificationStyle, setNotificationStyle ] = useState({ display: 'none' })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    if (state.visible) {
      setNotificationStyle(style)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } else if (!state.visible) {
      setNotificationStyle({ display: 'none' })
    }
  }, [state])

  return (
    <div style={notificationStyle}>
      {state.message}
    </div>
  )
}
export default Notification
