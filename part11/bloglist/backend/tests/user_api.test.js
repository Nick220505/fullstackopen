const { describe, beforeEach, test, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await new User({
      username: 'Nick220505',
      passwordHash: await bcrypt.hash('123', 10),
      name: 'Nicolas Pardo',
    }).save()
  })

  test('valid user is created and the status code is 201', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send({
        username: 'Harry',
        password: '456',
        name: 'Harry Potter',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes('Harry'))
  })

  describe('invalid users are not created and the status code is 400', () => {
    test('if the provided user does not contain a username', async () => {
      const usersAtStart = await helper.usersInDb()

      const result = await api
        .post('/api/users')
        .send({
          password: '456',
          name: 'Harry Potter',
        })
        .expect(400)

      assert(result.body.error.includes('Path `username` is required.'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('if the provided user does not contain a password', async () => {
      const usersAtStart = await helper.usersInDb()

      const result = await api
        .post('/api/users')
        .send({
          username: 'Harry',
          name: 'Harry Potter',
        })
        .expect(400)

      assert(result.body.error.includes('password missing'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('if the provided username is already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const result = await api
        .post('/api/users')
        .send({
          username: 'Nick220505',
          password: '456',
          name: 'Nicolas Pardo',
        })
        .expect(400)

      assert(result.body.error.includes('expected `username` to be unique'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('if the provided username is not at least 3 characters long', async () => {
      const usersAtStart = await helper.usersInDb()

      const result = await api
        .post('/api/users')
        .send({
          username: 'ab',
          password: '123',
          name: 'Harry Potter',
        })
        .expect(400)

      assert(
        result.body.error.includes(
          'Path `username` (`ab`) is shorter than the minimum allowed length (3).'
        )
      )

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('if the provided password is not at least 3 characters long', async () => {
      const usersAtStart = await helper.usersInDb()

      const result = await api
        .post('/api/users')
        .send({
          username: 'Harry',
          password: '12',
          name: 'Harry Potter',
        })
        .expect(400)

      assert(
        result.body.error.includes(
          'password must be at least 3 characters long'
        )
      )

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
