const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (!password) {
    return response.status(400).json({ error: 'password missing' })
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const savedUser = await new User({ username, passwordHash, name }).save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter