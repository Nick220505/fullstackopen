import { useState, useContext, Fragment } from 'react';
import MessageContext from '../contexts/MessageContext';
import DiaryContext from '../contexts/DiaryContext';
import { NewDiary, Visibility, Weather } from '../types';
import { addEntry } from '../services/diaryService';
import Notification from './Notification';

const DiaryEntryForm = () => {
  const [diary, setDiary] = useState<NewDiary>({
    weather: Weather.NotSelected,
    visibility: Visibility.NotSelected,
    date: '',
    comment: '',
  });

  const messageContext = useContext(MessageContext);
  const diaryContext = useContext(DiaryContext);

  if (!messageContext || !diaryContext) {
    throw new Error('MessageContext or DiaryContext were not provided');
  }

  const messageDispatch = messageContext[1];
  const diariesDispatch = diaryContext[1];

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    addEntry(diary)
      .then((savedDiary) => {
        diariesDispatch({
          type: 'ADD',
          payload: savedDiary,
        });
        messageDispatch({
          type: 'SET',
          payload: { value: 'Diary saved successfully', type: 'success' },
        });
      })
      .catch((error) => {
        messageDispatch({
          type: 'SET',
          payload: { value: String(error), type: 'error' },
        });
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification />
      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={diary.date}
            onChange={(e) => setDiary({ ...diary, date: e.target.value })}
          />
        </div>
        <div>
          visibility
          {Object.values(Visibility).map(
            (value) =>
              value !== Visibility.NotSelected && (
                <Fragment key={value}>
                  <span style={{ marginLeft: 5 }}>{value}</span>
                  <input
                    type="radio"
                    name="visibility"
                    value={value}
                    onChange={() => setDiary({ ...diary, visibility: value })}
                  />
                </Fragment>
              )
          )}
        </div>
        <div>
          weather
          {Object.values(Weather).map(
            (value) =>
              value !== Weather.NotSelected && (
                <Fragment key={value}>
                  <span style={{ marginLeft: 5 }}>{value}</span>
                  <input
                    type="radio"
                    name="weather"
                    value={value}
                    onChange={() => setDiary({ ...diary, weather: value })}
                  />
                </Fragment>
              )
          )}
        </div>
        <div>
          comment
          <input
            type="text"
            value={diary.comment}
            onChange={(e) => setDiary({ ...diary, comment: e.target.value })}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryEntryForm;
