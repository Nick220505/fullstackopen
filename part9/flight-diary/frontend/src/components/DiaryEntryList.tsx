import { useEffect, useContext } from 'react';
import DiaryContext from '../contexts/DiaryContext';
import DiaryEntry from './DiaryEntry';
import { getAll } from '../services/diaryService';

const DiaryEntryList = () => {
  const context = useContext(DiaryContext);

  if (!context) {
    throw new Error('DiaryContext was not provided');
  }

  const [diaries, diariesDispatch] = context;

  useEffect(() => {
    getAll().then((diaryEntries) => {
      diariesDispatch({
        type: 'SET',
        payload: diaryEntries,
      });
    });
  }, [diariesDispatch]);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <DiaryEntry key={diary.id} {...diary} />
      ))}
    </div>
  );
};

export default DiaryEntryList;
