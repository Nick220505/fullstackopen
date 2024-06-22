import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  return res.send({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.target || !req.body.daily_exercises) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = Number(req.body.target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyExercises: number[] = req.body.daily_exercises;

  if (isNaN(target) || !Array.isArray(dailyExercises)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  for (const dailyExercise of dailyExercises) {
    if (isNaN(dailyExercise)) {
      return res
        .status(400)
        .send({ error: 'daily_exercises must be an array of numbers' });
    }
  }

  return res.json(calculateExercise(target, dailyExercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
