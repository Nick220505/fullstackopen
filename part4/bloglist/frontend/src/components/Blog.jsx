import Togglable from "./Togglable"

const Blog = ({ blog, updateBlog }) => {

  const { id, title, author, url, likes } = blog

  const blogStyle = {
    border: '2px solid black',
    padding: '5px',
    marginBottom: '5px',
    display: 'flex'
  }

  const update = async () => {
    await updateBlog({
      id,
      likes: likes + 1,
      author,
      title,
      url
    })
  }

  return (
    <Togglable
      buttonLabelFirstComponent="view"
      buttonLabelSecondComponent="hide"
      style={blogStyle}
    >
      <div>
        {title}
      </div>
      <div>
        {title}
        <br/>
        {url}
        <br/>
        likes {likes}
        <button onClick={update}>
          like
        </button>
        <br/>
        {author}
      </div>
    </Togglable>
  )
}

export default Blog