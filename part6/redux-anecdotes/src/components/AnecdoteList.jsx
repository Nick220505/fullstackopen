import { useDispatch, useSelector } from 'react-redux'
import { increaseVotesOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return (filter === '')
      ? anecdotes
      : anecdotes.filter(anecdote => (
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      ))
  })

  const vote = id => {
    console.log('vote', id)
    dispatch(increaseVotesOf(id))
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
            <button onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList