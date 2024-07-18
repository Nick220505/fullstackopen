import { Router } from 'express';
import getAuthors from '@/controllers/authorController';

const authorRouter = Router();

authorRouter.get('/', getAuthors);

export default authorRouter;
