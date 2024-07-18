import { Router } from 'express';
import { tokenExtractor, adminValidator } from '@/middlewares';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} from '@/controllers/userController';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.put('/:username', tokenExtractor, adminValidator, updateUser);

export default userRouter;
