import { useContext } from 'react';
import MessageContext from '../contexts/MessageContext';

const Notification = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('useContext must be used within a MessageContextProvider');
  }

  const [message, messageDispatch] = context;

  if (!message) return null;

  setTimeout(() => {
    messageDispatch({ type: 'UNSET' });
  }, 5000);

  return (
    <div
      style={{
        color: message.type === 'success' ? 'green' : 'red',
        margin: 10,
      }}
    >
      {message.value}
    </div>
  );
};

export default Notification;
