import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const { id, title } = blog

  const blogStyle = {
    border: '2px solid black',
    padding: '5px',
    marginBottom: '5px',
    display: 'flex',
  }

  return (
    <div className="blog-title" style={blogStyle}>
      <Link to={`/blogs/${id}`}>{title}</Link>
    </div>
  )
}

export default Blog
