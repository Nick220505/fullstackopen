import { Request, Response } from 'express';
import { Blog } from '@/models';
import { sequelize } from '@/utils/db';

const getAuthors = async (_req: Request, res: Response) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  });
  return res.json(authors);
};

export default getAuthors;
