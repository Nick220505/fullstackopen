import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useUserDispatch } from '../contexts/UserContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()
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
      navigate('/')
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
    <Container
      maxWidth="sm"
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Card>
        <CardContent sx={{ margin: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography gutterBottom variant="h4" component="div">
              Log in to application
            </Typography>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField
              type="text"
              id="username"
              name="Username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              margin="normal"
              fullWidth
            />
            <TextField
              type="password"
              id="password"
              name="Password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              fullWidth
            />
            <br />
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginForm
