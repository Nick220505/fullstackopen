import { Request, Response } from 'express';

const unknownEndpoint = (_req: Request, res: Response) => {
  return res.status(404).json({ error: 'Unknown endpoint' });
};

export default unknownEndpoint;
