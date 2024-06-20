import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_AND_GENRES, FILTER_GENRE } from '../queries'
import BookTable from './BookTable'

const Recommendations = () => {
  const [books, setBooks] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState(null)

  const { data, loading } = useQuery(ALL_BOOKS_AND_GENRES)

  useEffect(() => {
    if (data) {
      setFavoriteGenre(
        data.allGenres[Math.floor(Math.random() * data.allGenres.length)]
      )
      setBooks(data.allBooks)
    }
  }, [data])

  const { data: filteredData } = useQuery(FILTER_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  })

  useEffect(() => {
    if (filteredData) {
      setBooks(filteredData.allBooks)
    }
  }, [filteredData])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <BookTable books={books} />
    </div>
  )
}

export default Recommendations
