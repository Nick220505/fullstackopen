const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
            username
            <input
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <br/>
            password
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <br/>
            <button type="submit">login</button>
        </form>
    </>
  )
}

export default LoginForm