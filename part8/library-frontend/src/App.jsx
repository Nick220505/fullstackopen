import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'

import { ALL_BOOKS_AND_GENRES, BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'

export const updateCache = (cache, query, addedBook) => {
  const uniq = (g) => {
    let seen = new Set()
    return g.filter((item) => {
      return seen.has(item) ? false : seen.add(item)
    })
  }

  const addIfNotExisting = (genres, addedBook) => {
    addedBook.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
    return genres
  }

  cache.updateQuery(query, ({ allBooks, allGenres }) => {
    const uniqByTitle = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        const k = item.title
        return seen.has(k) ? false : seen.add(k)
      })
    }

    const books = uniqByTitle(allBooks.concat(addedBook))
    return {
      allBooks: books,
      allGenres: addIfNotExisting(uniq(allGenres), addedBook),
    }
  })
}

const App = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS_AND_GENRES }, addedBook)
    },
  })

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
    navigate('/login')
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
