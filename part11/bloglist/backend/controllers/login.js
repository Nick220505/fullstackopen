const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  if (!user) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const correctPassword = await bcrypt.compare(password, user.passwordHash)

  if (!correctPassword) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
    { expiresIn: '1h' }
  )

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
