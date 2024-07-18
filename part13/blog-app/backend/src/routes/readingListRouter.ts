import { Router } from 'express';
import { tokenExtractor } from '@/middlewares';
import {
  getReadingLists,
  createReadingList,
  updateReadingList,
} from '@/controllers/readingListController';

const readingListRouter = Router();

readingListRouter.get('/', getReadingLists);
readingListRouter.post('/', createReadingList);
readingListRouter.put('/:id', tokenExtractor, updateReadingList);

export default readingListRouter;
