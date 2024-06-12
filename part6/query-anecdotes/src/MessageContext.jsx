import PropTypes from 'prop-types'
import { useReducer, createContext, useContext } from 'react'

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

const MessageContext = createContext()

export const useMessageValue = () => {
  const context = useContext(MessageContext)
  return context[0]
}

export const useMessageDispatch = () => {
  const context = useContext(MessageContext)
  return context[1]
}

export const MessageContextProvider = ({ children }) => {
  const [message, messageDispatch] = useReducer(messageReducer, '')
  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {children}
    </MessageContext.Provider>
  )
}

MessageContextProvider.propTypes = {
  children: PropTypes.element
}

export default MessageContext
