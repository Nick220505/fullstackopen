const Notification = ({ message }) => {
  const successMessage = message.type === 'success'

  return (
    <div
      className="notification"
      style={{
        backgroundColor: 'lightgray',
        color: successMessage ? 'green': 'red',
        fontSize: '25px',
        border: `3px solid ${successMessage ? 'green': 'red'}`,
        borderRadius:'5px',
        padding: '10px'
      }}
    >
      {message.text}
    </div>
  )
}

export default Notification