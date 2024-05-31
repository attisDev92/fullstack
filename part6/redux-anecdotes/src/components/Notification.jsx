import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"

const Notification = () => {

  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const [ displayNotificacion, setDisplayNotification ] = useState('none')

  useEffect(() => {
    if (notification.active) {
      setDisplayNotification('block')
      setTimeout(() => {
        dispatch(clearNotification())
      }, notification.time)
    }
    
  }, [notification])


  const style = {
    display: displayNotificacion,
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification