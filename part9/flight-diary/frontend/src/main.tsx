import ReactDOM from 'react-dom/client';
import { DiaryContextProvider } from './contexts/DiaryContext.tsx';
import { MessageContextProvider } from './contexts/MessageContext.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DiaryContextProvider>
    <MessageContextProvider>
      <App />
    </MessageContextProvider>
  </DiaryContextProvider>
);
