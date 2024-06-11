import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (_, action) => action.payload,
    removeNotification: () => '',
  }
})

export const {
  setNotification,
  removeNotification
} = notificationSlice.actions
export default notificationSlice.reducer

export const showNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(removeNotification()), time)
  }
}