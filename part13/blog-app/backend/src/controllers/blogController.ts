import { Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { Blog, User } from '@/models';
import { RequestWithToken, DecodedToken } from '@/types';

export const getBlogs = async (req: Request, res: Response) => {
  const where: WhereOptions<Blog> = {};

  const searchQuery = req.query['search'] as string | undefined;
  if (searchQuery) {
    where[Op.or as keyof WhereOptions<Blog>] = [
      {
        title: {
          [Op.iLike]: `%${searchQuery}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${searchQuery}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  });
  return res.json(blogs);
};

export const getBlogById = async (req: Request, res: Response) => {
  const blog = await Blog.findByPk(req.params['id'], {
    include: {
      model: User,
      attributes: ['name'],
    },
  });
  if (!blog) {
    return res.sendStatus(404);
  }
  return res.json(blog);
};

export const createBlog = async (req: Request, res: Response) => {
  const decodedToken = (req as RequestWithToken).decodedToken as DecodedToken;
  const user = await User.findByPk(decodedToken.id);
  const createdBlog = await Blog.create({
    ...req.body,
    userId: user?.id,
    date: new Date(),
  });
  return res.status(201).json(createdBlog);
};

export const updateBlog = async (req: Request, res: Response) => {
  const [updatedRowsCount, [updatedBlog]] = await Blog.update(req.body, {
    where: { id: req.params['id'] },
    returning: true,
  });

  if (updatedRowsCount === 0) {
    return res.sendStatus(404);
  }

  return res.json(updatedBlog);
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await Blog.findByPk(id);
  if (!blog) {
    return res.sendStatus(404);
  }

  const decodedToken = (req as RequestWithToken).decodedToken as DecodedToken;
  const user = await User.findByPk(decodedToken.id);
  if (!user || user.id !== blog.userId) {
    return res.sendStatus(401);
  }

  await Blog.destroy({
    where: { id },
  });

  return res.sendStatus(204);
};
