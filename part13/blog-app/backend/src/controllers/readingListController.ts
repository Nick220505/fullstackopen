import { Request, Response } from 'express';
import { ReadingList, User } from '@/models';
import { DecodedToken, RequestWithToken } from '@/types';

export const getReadingLists = async (_req: Request, res: Response) => {
  const readingLists = await ReadingList.findAll();
  return res.json(readingLists);
};

export const createReadingList = async (req: Request, res: Response) => {
  const createdReadingList = await ReadingList.create(req.body);
  return res.status(201).json(createdReadingList);
};

export const updateReadingList = async (req: Request, res: Response) => {
  const decodedToken = (req as RequestWithToken).decodedToken as DecodedToken;
  const user = await User.findByPk(decodedToken.id);

  const readingList = await ReadingList.findByPk(req.params['id']);
  if (!readingList) {
    return res.sendStatus(404);
  }
  if (readingList.userId !== user?.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  readingList.read = req.body.read === true;
  const updatedReadingList = await readingList.save();
  return res.json(updatedReadingList);
};
