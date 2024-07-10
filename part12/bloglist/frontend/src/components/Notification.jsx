import { useNotificationValue } from '../contexts/NotificationContext'
import { Alert, Box } from '@mui/material'

const Notification = () => {
  const { message, type } = useNotificationValue()

  if (!message) {
    return null
  }

  const successMessage = type === 'success'

  return (
    <Box sx={{ margin: 3 }}>
      <Alert severity={successMessage ? 'success' : 'error'}>{message}</Alert>
    </Box>
  )
}

export default Notification
