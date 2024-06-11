import { useDispatch, useSelector } from 'react-redux'
import { increaseVotesOf } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

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
    console.log('vote', anecdote.id)
    dispatch(increaseVotesOf(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
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