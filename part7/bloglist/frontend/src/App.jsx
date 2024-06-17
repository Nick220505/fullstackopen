import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import { useUserValue, useUserDispatch } from './contexts/UserContext'
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Grid,
} from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const App = () => {
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    userDispatch({ type: 'UNSET' })
  }

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ alignItems: 'center' }}
          >
            <Grid item xs={6} sm={3} md={3}>
              <Button color="inherit" component={Link} to="/">
                Blogs
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography>{user.name} logged in</Typography>
            </Grid>
            <Grid item xs={6} sm={2} md={3}>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
        <Typography gutterBottom variant="h2" component="div">
          Blog App
        </Typography>
      </Box>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="blogs/:id" element={<BlogView />} />
      </Routes>
    </Container>
  )
}

export default App
