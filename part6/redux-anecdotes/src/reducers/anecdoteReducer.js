import { createSlice } from '@reduxjs/toolkit'

const orderByNumberOfVotes = anecdotes => {
  return anecdotes.sort((anecdoteA, anecdoteB) => (
    anecdoteB.votes - anecdoteA.votes
  ))
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload)
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
    },
    setAnecdotes: (state, action) => action.payload
  }
})

export const { createAnecdote, increaseVotesOf, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer