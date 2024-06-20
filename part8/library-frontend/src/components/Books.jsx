import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { distinctGenres, filterBooks } from '../utils/bookUtils'
import BookTable from './BookTable'

const Books = () => {
  const [books, setBooks] = useState([])
  const { data, loading } = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <BookTable books={books} />
      {distinctGenres(data.allBooks).map((genre) => (
        <button
          key={genre}
          onClick={() => setBooks(filterBooks(data.allBooks, genre))}
        >
          {genre}
        </button>
      ))}
      {distinctGenres(data.allBooks).length > 0 && (
        <button onClick={() => setBooks(filterBooks(data.allBooks))}>
          all genres
        </button>
      )}
    </div>
  )
}

export default Books
