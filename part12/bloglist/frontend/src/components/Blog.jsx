import { Link } from 'react-router-dom'
import { ListItem, ListItemText, Divider } from '@mui/material'

const Blog = ({ blog }) => {
  const { id, title } = blog

  return (
    <>
      <Divider component="li" />
      <ListItem>
        <Link to={`/blogs/${id}`}>
          <ListItemText primary={title} />
        </Link>
      </ListItem>
    </>
  )
}

export default Blog
