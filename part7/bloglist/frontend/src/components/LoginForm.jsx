import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useUserDispatch } from '../contexts/UserContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const LoginForm = () => {
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
    } catch (exception) {
      notificationDispatch({
        type: 'SET',
        payload: {
          message: 'wrong username or password',
          type: 'error',
        },
      })
      setTimeout(() => notificationDispatch({ type: 'HIDE' }), 5000)
    }
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        password
        <input
          data-testid="password"
          type="password"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
