import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

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
