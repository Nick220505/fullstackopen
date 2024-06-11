import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const orderByNumberOfVotes = anecdotes => {
  return anecdotes.sort((anecdoteA, anecdoteB) => (
    anecdoteB.votes - anecdoteA.votes
  ))
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
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

export const { appendAnecdote, increaseVotesOf, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote)
    dispatch(increaseVotesOf(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer