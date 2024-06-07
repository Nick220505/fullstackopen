const { MONGODB_URI } = require('./utils/config')
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app