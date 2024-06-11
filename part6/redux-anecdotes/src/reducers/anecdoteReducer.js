import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const orderByNumberOfVotes = anecdotes => {
  return anecdotes.sort((anecdoteA, anecdoteB) => (
    anecdoteB.votes - anecdoteA.votes
  ))
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: anecdotesAtStart.map(content => (
    { id: getId(), content, votes: 0 }
  )),
  reducers: {
    createAnecdote: (state, action) => {
      state.push({
        id: getId(),
        content: action.payload,
        votes: 0
      })
    },
    increaseVotesOf: (state, action) => {
      return orderByNumberOfVotes(state.map(anecdote => {
        if (anecdote.id === action.payload) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      }))
    }
  }
})

export const { createAnecdote, increaseVotesOf } = anecdoteSlice.actions
export default anecdoteSlice.reducer