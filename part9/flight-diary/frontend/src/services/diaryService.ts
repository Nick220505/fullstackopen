import axios from 'axios';
import { Diary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = async () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const addEntry = async (entry: NewDiary) => {
  return axios
    .post<Diary>(baseUrl, entry)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        if (error.response) {
          throw new Error(String(error.response.data));
        }
      }
      throw new Error('Error saving diary: ' + error);
    });
};

export default { getAll, addEntry };
