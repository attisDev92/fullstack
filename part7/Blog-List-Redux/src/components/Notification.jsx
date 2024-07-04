import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'

const Notification = () => {
  const notificationState = useSelector(state => state.notification)
  if (!notificationState.active) {
    return null
  }
  return (
    <Alert variant='filled' severity='warning'>
      {notificationState.message}
    </Alert>
  )
}

export default Notification
