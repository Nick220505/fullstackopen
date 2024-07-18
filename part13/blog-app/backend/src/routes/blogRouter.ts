import { Router } from 'express';
import { tokenExtractor } from '@/middlewares';
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '@/controllers/blogController';

const blogRouter = Router();

blogRouter.get('/', getBlogs);

blogRouter.get('/:id', getBlogById);

blogRouter.post('/', tokenExtractor, createBlog);

blogRouter.put('/:id', tokenExtractor, updateBlog);

blogRouter.delete('/:id', tokenExtractor, deleteBlog);

export default blogRouter;
