import { Request, Response, NextFunction } from 'express';
import logger from '@/utils/logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  return next();
};

export default requestLogger;
