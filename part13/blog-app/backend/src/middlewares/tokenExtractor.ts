import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '@/utils/config';
import { User } from '@/models';
import RequestWithToken from '@/types/RequestWithToken';
import DecodedToken from '@/types/DecodedToken';

const tokenExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.get('authorization');
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Token missing' });
  }
  try {
    const decodedToken = jwt.verify(
      authorization?.substring(7),
      JWT_SECRET!,
    ) as DecodedToken;

    const user = await User.findByPk(decodedToken.id);
    if (!user || user.disabled) {
      return res.status(401).json({ error: 'User account is disabled' });
    }

    if (NODE_ENV !== 'test') {
      if (!req.session.userId || req.session.userId !== user.id) {
        return res.status(401).json({ error: 'Invalid session' });
      }
    }

    (req as RequestWithToken).decodedToken = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default tokenExtractor;
