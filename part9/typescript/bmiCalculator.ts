import { isNotNumber } from './utils';

interface Arguments {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Arguments => {
  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('arguments must be numbers');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);
  let result;
  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    result = 'Normal';
  } else if (bmi >= 25 && bmi < 30) {
    result = 'Overweight';
  } else {
    result = 'Obese';
  }
  return `${result} (${bmi})`;
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
