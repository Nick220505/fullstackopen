import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useMessageDispatch } from '../MessageContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const messageDispatch = useMessageDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      messageDispatch({
        type: 'SET',
        payload: `anecdote '${newAnecdote.content}' created`
      })
      setTimeout(() => { messageDispatch({ type: 'REMOVE' }) }, 5000)
    },
    onError: ({ response }) => {
      if (response.status === 400) {
        messageDispatch({
          type: 'SET',
          payload: 'too short anecdote, must have length 5 or more'
        })
        setTimeout(() => messageDispatch({ type: 'REMOVE' }), 5000)
      }
    }
  })

  const handleCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
