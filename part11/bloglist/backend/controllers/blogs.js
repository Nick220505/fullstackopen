const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    name: 1,
  })
  response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const savedBlog = await new Blog({
    ...request.body,
    user,
  }).save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  ).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blogId = request.params.id

    const user = request.user
    const blog = await Blog.findById(blogId)
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'invalid user' })
    }

    await Blog.findByIdAndDelete(blogId)
    user.blogs = user.blogs.filter((blog) => blog.toString() !== blogId)
    await user.save()
    response.status(204).end()
  }
)

module.exports = blogsRouter
