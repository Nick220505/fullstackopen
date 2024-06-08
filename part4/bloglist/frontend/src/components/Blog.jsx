import Togglable from "./Togglable"

const Blog = ({ blog }) => {

  const blogStyle = {
    border: '2px solid black',
    padding: '5px',
    marginBottom: '5px',
    display: 'flex'
  }

  return (
    <Togglable
      buttonLabelFirstComponent="view"
      buttonLabelSecondComponent="hide"
      style={blogStyle}
    >
      <div>
        {blog.title}
      </div>
      <div>
        {blog.title}
        <br/>
        {blog.url}
        <br/>
        likes {blog.likes}
        <button>like</button>
        <br/>
        {blog.author}
      </div>
    </Togglable>
  )
}

export default Blog