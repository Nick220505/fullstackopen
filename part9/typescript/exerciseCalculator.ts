import { isNotNumber } from './utils';

type Rating = 1 | 2 | 3;

interface Exercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesArguments {
  target: number;
  exerciseHours: number[];
}

const parseExercisesArguments = (args: string[]): ExercisesArguments => {
  if (args.length < 4) {
    throw new Error('At least two number arguments required');
  }
  for (let i = 2; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error('all arguments must be numbers');
    }
  }

  return {
    target: Number(args[2]),
    exerciseHours: args.slice(3, args.length).map((arg) => Number(arg)),
  };
};

const calculateExercise = (
  target: number,
  exerciseHours: number[]
): Exercises => {
  const periodLength = exerciseHours.length;
  const totalHours = exerciseHours.reduce((total, hour) => total + hour, 0);
  const trainingDays = exerciseHours.reduce((numberOfDays, day) => {
    if (day !== 0) {
      return numberOfDays + 1;
    }
    return numberOfDays;
  }, 0);

  // Count how many days no exercise was done
  const noExerciseDays = exerciseHours.reduce((totalDays, hours) => {
    if (hours === 0) {
      return totalDays + 1;
    }
    return totalDays;
  }, 0);

  let rating: Rating;
  let ratingDescription: string;

  switch (noExerciseDays) {
    case 0:
    case 1:
      rating = 3;
      ratingDescription = 'good, keep it up!';
      break;
    case 2:
    case 3:
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
    default:
      rating = 1;
      ratingDescription = 'not ideal, do more exercise!';
  }

  const average = totalHours / periodLength;
  const success = average >= target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, exerciseHours } = parseExercisesArguments(process.argv);
  console.log(calculateExercise(target, exerciseHours));
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
