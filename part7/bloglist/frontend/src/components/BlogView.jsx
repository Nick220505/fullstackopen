import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useUserValue } from '../contexts/UserContext'
import userService from '../services/users'
import blogService from '../services/blogs'
import Comments from './Comments'

const BlogView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const loggedInUser = useUserValue()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blog', updatedBlog.id], updatedBlog)
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `blog ${updatedBlog.title} by ${updatedBlog.author} has been updated`,
          type: 'success',
        },
      })
      setTimeout(() => notificationDispatch({ type: 'HIDE' }), 5000)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, variables) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== variables),
      )
      queryClient.removeQueries(['blog', variables])
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `blog ${title} by ${author} has been removed`,
          type: 'success',
        },
      })
      setTimeout(() => notificationDispatch({ type: 'HIDE' }), 5000)
    },
  })

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
    retry: false,
  })

  const { data: user } = useQuery({
    queryKey: ['user', loggedInUser.username],
    queryFn: () => userService.getUserByUsername(loggedInUser.username),
    enabled: !!blog,
  })

  if (isLoading) {
    return <div>Loading blog...</div>
  }

  if (isError) {
    return (
      <div>
        {error.response.status === 404
          ? 'Blog not found'
          : 'Error loading blog.'}
      </div>
    )
  }

  const { title, author, url, likes, user: blogUser } = blog

  const update = () => {
    updateBlogMutation.mutate({ id, title, author, url, likes: likes + 1 })
  }

  const remove = () => {
    deleteBlogMutation.mutate(id)
    navigate('/')
  }

  const blogAddedByUser = user?.blogs.find((b) => b.id === blog.id)

  return (
    <div>
      <h2>{title}</h2>
      <a href={url}>{url}</a>
      <div>
        {likes} likes
        <button className="like-button" onClick={update}>
          like
        </button>
      </div>
      <div>added by {blogUser.name}</div>
      {blogAddedByUser && (
        <button className="remove-button" onClick={remove}>
          remove
        </button>
      )}
      <Comments blog={blog} />
    </div>
  )
}

export default BlogView
