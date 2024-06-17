import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  CircularProgress,
} from '@mui/material'

const User = () => {
  const { id } = useParams()
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id),
    retry: false,
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
        {error.response.status === 404
          ? 'User not found.'
          : 'Error loading user.'}
      </Typography>
    )
  }

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        {user.name}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        added blogs
      </Typography>
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
        {user.blogs.map((blog) => (
          <Fragment key={blog.id}>
            <Divider component="li" />
            <ListItem>
              <ListItemText>{blog.title}</ListItemText>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </div>
  )
}

export default User
