import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'

const BlogForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `blog ${newBlog.title} by ${newBlog.author} has been added`,
          type: 'success',
        },
      })
      setTimeout(() => notificationDispatch({ type: 'HIDE' }), 5000)
    },
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        title:
        <input
          data-testid="title"
          type="text"
          name="Title"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author:
        <input
          data-testid="author"
          type="text"
          name="Author"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url:
        <input
          data-testid="url"
          type="text"
          name="Url"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button id="create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
