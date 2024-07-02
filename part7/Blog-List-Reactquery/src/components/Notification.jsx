import { useEffect, useState } from 'react'
import { useNotification } from '../Reducers/notificationContext'

const Notification = () => {
  const { state, dispatch } = useNotification()
  const [notificationStyle, setNotificationStyle] = useState({
    display: 'none',
  })
  useEffect(() => {
    if (state.visible) {
      setNotificationStyle({ display: 'block' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } else if (!state.visible) {
      setNotificationStyle({ display: 'none' })
    }
  }, [state])

  return <div style={notificationStyle}>{state.message}</div>
}

export default Notification
