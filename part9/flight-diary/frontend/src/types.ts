export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
  NotSelected = 'not selected',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
  NotSelected = 'not selected',
}

export interface Diary {
  id: number;
  weather: Weather;
  visibility: Visibility;
  date: string;
  comment: string;
}

export type NewDiary = Omit<Diary, 'id'>;
