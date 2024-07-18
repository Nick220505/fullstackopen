import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '@/utils/config';
import { User } from '@/models';
import { logger } from '@/utils';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({
      error: 'Invalid username or password',
    });
  }

  if (user.disabled) {
    return res.status(401).json({
      error: 'Account disabled, please contact admin',
    });
  }

  req.session.userId = user.id;
  req.session.save((err) => {
    if (err) {
      logger.error('Session save error:', err);
    }
  });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET!);
  return res.json({ token });
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not logout' });
    }
    res.clearCookie('connect.sid');
    return res.sendStatus(204);
  });
};
