import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const { message, type } = useNotificationValue()

  if (!message) {
    return null
  }

  const successMessage = type === 'success'

  return (
    <div
      className="notification"
      style={{
        backgroundColor: 'lightgray',
        color: successMessage ? 'green' : 'red',
        fontSize: '25px',
        border: `3px solid ${successMessage ? 'green' : 'red'}`,
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      {message}
    </div>
  )
}

export default Notification
