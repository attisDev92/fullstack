import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationState = useSelector(state => state.notification)
  if (!notificationState.active) {
    return null
  }
  return <div>{notificationState.message}</div>
}

export default Notification
