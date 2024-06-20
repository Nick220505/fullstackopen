import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_AND_GENRES, FILTER_GENRE } from '../queries'
import BookTable from './BookTable'

const Books = () => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const { data, loading } = useQuery(ALL_BOOKS_AND_GENRES)

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
      setGenres(data.allGenres)
    }
  }, [data])

  const { data: filteredData } = useQuery(FILTER_GENRE, {
    variables: { genre },
    skip: !genre,
  })

  useEffect(() => {
    if (filteredData) {
      setBooks(filteredData.allBooks)
    }
  }, [filteredData])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <BookTable books={books} />
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      {data.allBooks.length > 0 && (
        <button
          onClick={() => {
            setBooks(data.allBooks)
            setGenre(null)
          }}
        >
          all genres
        </button>
      )}
    </div>
  )
}

export default Books
