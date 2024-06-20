import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'

const Authors = ({ token }) => {
  const { data, loading } = useQuery(ALL_AUTHORS)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <BirthYearForm authors={data.allAuthors} />}
    </div>
  )
}

export default Authors
