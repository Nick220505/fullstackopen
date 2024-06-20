import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('library-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button>
          <Link to="/authors">authors</Link>
        </button>
        <button>
          <Link to="/">books</Link>
        </button>
        {token ? (
          <>
            <button>
              <Link to="/new-book">add book</Link>
            </button>
            <button>
              <Link to="/recommendations">recommend</Link>
            </button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button>
            <Link to="/login">login</Link>
          </button>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors token={token} />} />
        <Route path="/new-book" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  )
}

export default App
