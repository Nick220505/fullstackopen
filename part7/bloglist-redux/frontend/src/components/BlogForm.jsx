import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import {
  setNotification,
  hideNotification,
} from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
    dispatch(
      setNotification({
        message: `blog ${title} by ${author} has been added`,
        type: 'success',
      }),
    )
    setTimeout(() => dispatch(hideNotification()), 5000)
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
