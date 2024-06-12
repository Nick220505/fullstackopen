import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMessageDispatch } from './MessageContext'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const messageDispatch = useMessageDispatch()

  const updatedAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => {
        if (anecdote.id === updatedAnecdote.id) {
          return updatedAnecdote
        }
        return anecdote
      }))
      messageDispatch({
        type: 'SET',
        payload: `anecdote '${updatedAnecdote.content}' voted`
      })
      setTimeout(() => { messageDispatch({ type: 'REMOVE' }) }, 5000)
    }
  })

  const handleVote = (anecdote) => updatedAnecdoteMutation.mutate({
    ...anecdote,
    votes: anecdote.votes + 1
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {data.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
