import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    hideNotification: () => initialState,
  },
})

export const { setNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer
