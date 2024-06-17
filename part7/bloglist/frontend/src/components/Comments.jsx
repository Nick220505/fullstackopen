import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'

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
      <h2>comments</h2>
      <form onSubmit={updateBlog}>
        <input
          type="text"
          name="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
