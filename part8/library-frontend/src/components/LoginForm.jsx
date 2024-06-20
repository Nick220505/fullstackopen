import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ token, setToken }) => {
  const navigate = useNavigate()

  if (token) {
    navigate('/')
  }

  const [username, setUsername] = useState('Nick220505')
  const [password, setPassword] = useState('secret')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error.graphQLErrors[0].message),
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-token', token)
    }
  }, [result.data, setToken])

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        password
        <input
          type="text"
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
