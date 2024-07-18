import { Router } from 'express';
import { login, logout } from '@/controllers/authController';

const authRouter = Router();

authRouter.post('/login', login);

authRouter.delete('/logout', logout);

export default authRouter;
