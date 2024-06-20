import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

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

  const distinctGenres = data.allBooks
    .map((book) => book.genres)
    .reduce((genres, currentGenres) => {
      currentGenres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      })
      return genres
    }, [])

  const filterBooks = (genre = 'ALL') => {
    setBooks(
      genre === 'ALL'
        ? data.allBooks
        : data.allBooks.filter((b) => b.genres.includes(genre))
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {distinctGenres.map((genre) => (
        <button key={genre} onClick={() => filterBooks(genre)}>
          {genre}
        </button>
      ))}
      {distinctGenres.length > 0 && (
        <button onClick={() => filterBooks()}>all genres</button>
      )}
    </div>
  )
}

export default Books
