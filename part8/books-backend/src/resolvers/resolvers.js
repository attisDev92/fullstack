const { GraphQLError } = require( 'graphql')
const Author = require('../models/Author')
const Book = require('../models/Book')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    authorsCount: () => Author.collection.countDocuments(),

    booksCount: () => Book.collection.countDocuments(),

    allBooks: async (root, args) => {
      const filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author._id;
        } else {
          return [];
        }
      }

      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      return Book.find(filter).populate('author');
    },

    allAuthors: async(root, args) => {
      return Author.find({}).populate('books')
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async(root, args, context) => {
      const {currentUser} = context
      if(!currentUser) {
        throw new GraphQLError('not authenticate', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try {
        let author = await Author.findOne({name: args.author})
        if(!author) {
          author = new Author({name: args.author})
        }
        let book = new Book({ ...args, author: author._id})
        author.books = [ ...author.books, book._id]
        await book.save()
        await author.save()
        return book.populate('author')
      } catch (error) {
        throw new GraphQLError('error input user', {
          extensions: {
            code: 'BAD_BOOK_INPUT',
          }
        })
      }
    },

    addAuthor: async(root, args, context) => {
      const { currentUser } = context
      if(!currentUser) {
        throw new GraphQLError('not authenticate', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try {
        const author = new Author({ ...args })
        return author.save()
      } catch { (error) => {
        throw new GraphQLError('error input user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }}
    },

    editAuthor: async(root, args, context) => {
      const { currentUser } = context
      if(!currentUser) {
        throw new GraphQLError('not authenticate', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      let author = await Author.findOne({name: args.name})
      if (!author) {
        throw new GraphQLError('the author doesn\'t exist', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: args.author
          }
        })
      }
      author.set({ born: args.born })
      await author.save()
      return author
    },

    createUser: async(root, args) => {
      const user = new User({ ...args })
      return user.save()
        .catch(error => {
          throw new GraphQLError('creating user faild', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        })
    },

    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })

      if(!user || args.password !== 'secret') {
        throw new GraphQLError('credentials wrong', {
          extensions: {
            code: 'BAD_USER-INPUT',
            invalidArgs: args
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  }
}

module.exports = resolvers