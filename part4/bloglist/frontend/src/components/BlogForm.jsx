import { useState } from 'react'

const BlogForm = ({ addBlog }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    await addBlog({ title, author, url })
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
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br/>
        author:
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br/>
        url:
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm