const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74));
