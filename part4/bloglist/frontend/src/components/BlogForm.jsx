const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, addBlog }) => {
  return (  
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      title:
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br/>
      author:
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br/>
      url:
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br/>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm