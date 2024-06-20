import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { distinctGenres, filterBooks } from '../utils/bookUtils'
import BookTable from './BookTable'

const Recommendations = () => {
  const { data, loading } = useQuery(ALL_BOOKS)

  if (loading) return <div>Loading...</div>

  const genres = distinctGenres(data.allBooks)
  const favoriteGenre = genres[Math.floor(Math.random() * genres.length)]
  const books = filterBooks(data.allBooks, favoriteGenre)

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
