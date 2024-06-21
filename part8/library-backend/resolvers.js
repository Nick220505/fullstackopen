const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      if (args.author) {
        return Book.find({ author: args.author }).populate('author')
      }
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({})
      return books
        .map((book) => book.genres)
        .reduce((genres, currentGenres) => {
          currentGenres.forEach((genre) => {
            if (!genres.includes(genre)) {
              genres.push(genre)
            }
          })
          return genres
        }, [])
    },
    me: (_, __, context) => context.currentUser,
  },
  Author: {
    bookCount: (root) =>
      Book.collection.countDocuments({ author: root.author }),
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const book = new Book({ id: uuid(), ...args, author })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        })
      }
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo

      return author.save()
    },
    createUser: async (_, args) => {
      try {
        return new User({ username: args.username }).save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      }
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

module.exports = resolvers
