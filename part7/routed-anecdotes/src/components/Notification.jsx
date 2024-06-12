const Notification = ({ message }) => {
  return (
    <div style={{
      border: '3px solid black',
      borderRadius: 5,
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
      display: message ? 'block' : 'none'
    }}>
      {message}
    </div>
  )
}

export default Notification
