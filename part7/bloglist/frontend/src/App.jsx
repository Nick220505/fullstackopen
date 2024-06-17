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
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  )
}

export default App
