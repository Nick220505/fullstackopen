import { Request, Response, NextFunction } from 'express';
import { DecodedToken, RequestWithToken } from '@/types';
import { User } from '@/models';

const adminValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const decodedToken = (req as RequestWithToken).decodedToken as DecodedToken;
  const user = await User.findByPk(decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: 'Operation not allowed' });
  }
  return next();
};

export default adminValidator;
