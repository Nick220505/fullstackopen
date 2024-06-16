import { useDispatch } from 'react-redux'
import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import {
  setNotification,
  hideNotification,
} from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'wrong username or password',
          type: 'error',
        }),
      )
      setTimeout(() => dispatch(hideNotification()), 5000)
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
