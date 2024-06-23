import { createContext, useReducer, Dispatch } from 'react';

interface Message {
  value: string;
  type: 'success' | 'error';
}
type MessageAction = { type: 'SET'; payload: Message } | { type: 'UNSET' };
type MessageContextType = [Message | null, Dispatch<MessageAction>];

const messageReducer = (
  state: Message | null = null,
  action: MessageAction
): Message | null => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'UNSET':
      return null;
    default:
      return state;
  }
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, messageDispatch] = useReducer(messageReducer, null);

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
