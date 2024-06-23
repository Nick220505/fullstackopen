import { Diary } from '../types';

const DiaryEntry = ({ weather, visibility, date, comment }: Diary) => {
  return (
    <div>
      <h3>{date}</h3>
      <p>visibility: {visibility}</p>
      <p>weather: {weather}</p>
      <p>comment: {comment}</p>
    </div>
  );
};

export default DiaryEntry;
