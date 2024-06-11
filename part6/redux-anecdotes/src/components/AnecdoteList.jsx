import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return (filter === '')
      ? anecdotes
      : anecdotes.filter(anecdote => (
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      ))
  })

  const vote = anecdote => {
    dispatch(updateAnecdote(anecdote))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList