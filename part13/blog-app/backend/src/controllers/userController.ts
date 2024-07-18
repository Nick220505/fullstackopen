import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User, Blog, Team } from '@/models';

export const getUsers = async (req: Request, res: Response) => {
  const { read } = req.query;
  const users = await User.findAll({
    include: [
      {
        model: Blog,
      },
      {
        model: Team,
        attributes: ['name', 'id'],
        through: {
          attributes: [],
        },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: ['id', 'title', 'author', 'url', 'likes', 'yearWritten'],
        through: {
          attributes: ['id', 'read'],
          where: read !== undefined ? { read: read === 'true' } : {},
        },
      },
    ],
  });
  return res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { read } = req.query;
  const user = await User.findByPk(req.params['id'], {
    include: [
      {
        model: Blog,
      },
      {
        model: Team,
        attributes: ['name', 'id'],
        through: {
          attributes: [],
        },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: ['id', 'title', 'author', 'url', 'likes', 'yearWritten'],
        through: {
          attributes: ['id', 'read'],
          where: read !== undefined ? { read: read === 'true' } : {},
        },
      },
    ],
  });
  if (!user) {
    return res.sendStatus(404);
  }
  return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, name, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const createdUser = await User.create({ username, name, passwordHash });
  return res.status(201).json(createdUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const { username: oldUsername } = req.params;
  const newUsername = req.body.username;
  if (!newUsername) {
    return res.status(400).json({ error: 'Missing new username' });
  }
  const [updatedRowsCount, [updatedUser]] = await User.update(
    { username: newUsername },
    { where: { username: oldUsername }, returning: true },
  );

  if (updatedRowsCount === 0) {
    return res.sendStatus(404);
  }
  return res.json(updatedUser);
};
