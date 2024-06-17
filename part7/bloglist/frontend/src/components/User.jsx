import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id),
    retry: false,
  })

  if (isLoading) {
    return <div>Loading user...</div>
  }

  if (isError) {
    return (
      <div>
        {error.response.status === 404
          ? 'User not found.'
          : 'Error loading user.'}
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
