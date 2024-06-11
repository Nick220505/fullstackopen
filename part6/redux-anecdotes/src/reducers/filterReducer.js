import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateValue(state, action) {
      state = action.payload ? action.payload : ''
      return state
    }
  }
})

export const { updateValue } = filterSlice.actions
export default filterSlice.reducer