import { Request, Response, NextFunction } from 'express';
import logger from '@/utils/logger';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.message);

  if (err.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .json({ error: err.message.replace(',', '').split('\n') });
  }

  if (err.name === 'TypeError' && req.method === 'PUT') {
    return res.status(400).json({
      error: `Required field missing in request body`,
    });
  }

  return res.status(500).json({ error: err.message });
};

export default errorHandler;
