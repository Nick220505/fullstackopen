import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    await login({ username, password })
  }

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        username
        <input
          data-testid="username"
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br/>
        password
        <input
          data-testid="password"
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm