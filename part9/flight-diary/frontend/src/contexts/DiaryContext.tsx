import { createContext, useReducer, Dispatch } from 'react';
import { Diary } from '../types';

type DiaryAction =
  | { type: 'SET'; payload: Diary[] }
  | { type: 'ADD'; payload: Diary };
type DiaryContextType = [Diary[], Dispatch<DiaryAction>];

const diaryReducer = (state: Diary[] = [], action: DiaryAction): Diary[] => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return state.concat(action.payload);
    default:
      return state;
  }
};

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [diaries, diariesDispatch] = useReducer(diaryReducer, []);

  return (
    <DiaryContext.Provider value={[diaries, diariesDispatch]}>
      {children}
    </DiaryContext.Provider>
  );
};

export default DiaryContext;
