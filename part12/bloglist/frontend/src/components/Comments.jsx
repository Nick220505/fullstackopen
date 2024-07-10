import { useState, Fragment } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'

const Comments = ({ blog }) => {
  const [newComment, setNewComment] = useState('')
  const queryClient = useQueryClient()

  const newCommentMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blog', updatedBlog.id], updatedBlog)
    },
  })

  const updateBlog = (event) => {
    event.preventDefault()
    delete blog.user
    newCommentMutation.mutate({
      ...blog,
      comments: [...blog.comments, newComment],
    })
  }

  return (
    <div>
      <Typography gutterBottom variant="h6" component="div">
        comments
      </Typography>
      <form onSubmit={updateBlog}>
        <TextField
          type="text"
          data-testid="new-comment"
          name="NewComment"
          label="New Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          rows={4}
        />
        <Button variant="contained" type="submit">
          add comment
        </Button>
      </form>
      <br />
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
        {blog.comments.map((comment, index) => (
          <Fragment key={index}>
            <Divider component="li" />
            <ListItem>
              <ListItemText>{comment}</ListItemText>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </div>
  )
}

export default Comments
