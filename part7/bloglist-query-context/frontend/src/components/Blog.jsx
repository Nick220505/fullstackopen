import { useState, useEffect } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import userService from '../services/users'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const Blog = ({ blog, user }) => {
  const notificationDispatch = useNotificationDispatch()
  const [blogAddedByUser, setBlogAddedByUser] = useState(false)

  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => {
          if (blog.id === updatedBlog.id) {
            return updatedBlog
          }
          return blog
        }),
      )
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `blog ${title} by ${author} has been updated`,
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

  useEffect(() => {
    userService.getUser(user.username).then((user) => {
      if (user.blogs.find((b) => b.id === blog.id)) {
        setBlogAddedByUser(true)
      }
    })
  }, [blog.id, user.username])

  const { id, title, author, url, likes } = blog

  const blogStyle = {
    border: '2px solid black',
    padding: '5px',
    marginBottom: '5px',
    display: 'flex',
  }

  const update = () => {
    updateBlogMutation.mutate({ id, title, author, url, likes: likes + 1 })
  }

  const remove = () => {
    deleteBlogMutation.mutate(id)
  }

  return (
    <Togglable
      buttonLabelFirstComponent="view"
      buttonLabelSecondComponent="hide"
      className="blog-content"
      style={blogStyle}
    >
      <div>
        <span className="blog-title">{title}</span>
      </div>
      <div>
        <span className="blog-title">{title}</span>
        <br />
        <span className="blog-url">{url}</span>
        <br />
        <span className="blog-likes">likes {likes}</span>
        <button className="like-button" onClick={update}>
          like
        </button>
        <br />
        <span className="blog-author">{author}</span>
        <br />
        {blogAddedByUser && (
          <button className="remove-button" onClick={remove}>
            remove
          </button>
        )}
      </div>
    </Togglable>
  )
}

export default Blog
