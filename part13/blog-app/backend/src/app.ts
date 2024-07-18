import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import {
  sessionMiddleware,
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './middlewares';
import {
  authRouter,
  userRouter,
  blogRouter,
  authorRouter,
  readingListRouter,
} from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(sessionMiddleware);
app.use(requestLogger);

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/blogs', blogRouter);
app.use('/authors', authorRouter);
app.use('/readinglists', readingListRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
