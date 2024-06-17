import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import {
  Container,
  Typography,
  List,
  Box,
  CircularProgress,
} from '@mui/material'

const Blogs = ({ user }) => {
  const togglableRef = useRef()
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Typography gutterBottom variant="h5" component="div">
        There was an error loading the blogs.
      </Typography>
    )
  }

  return (
    <Container>
      <Typography gutterBottom variant="h4" component="div">
        Blogs
      </Typography>
      <Togglable
        buttonLabelFirstComponent="create new blog"
        buttonLabelSecondComponent="cancel"
        style={{ marginBottom: '5px' }}
        ref={togglableRef}
      >
        <></>
        <BlogForm />
      </Togglable>
      <List
        sx={{
          py: 0,
          width: '100%',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </List>
    </Container>
  )
}

export default Blogs
