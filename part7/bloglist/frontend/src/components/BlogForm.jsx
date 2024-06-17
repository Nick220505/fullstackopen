import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'
import { Button, Typography, TextField } from '@mui/material'

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
      <Typography gutterBottom variant="h5" component="div">
        Create new
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          data-testid="title"
          name="Title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        <TextField
          type="text"
          data-testid="author"
          name="Author"
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        <TextField
          type="text"
          data-testid="url"
          name="Url"
          label="Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        <br />
        <br />
        <Button id="create-blog" type="submit" variant="contained">
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
