import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (isError) {
    return <div>Error loading users...</div>
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user.id}>
            <tr>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default Users
