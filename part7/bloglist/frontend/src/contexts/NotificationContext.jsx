import { createContext, useContext, useReducer } from 'react'

const initialState = {
  message: '',
  type: '',
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'HIDE':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState,
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1]
}

export default NotificationContext
