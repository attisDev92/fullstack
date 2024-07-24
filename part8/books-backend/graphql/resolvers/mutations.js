const { GraphQLError } = require('graphql');
const Author = require('../../models/Author');
const Book = require('../../models/Book');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { SUBSCRIPTIONS, pubsub } = require('./subscriptions');

require('dotenv').config()

const Mutation = {
  addBook: async (root, args, context) => {
    const { currentUser } = context;
    if (!currentUser) {
      throw new GraphQLError('not authenticate', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }
    try {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
      }
      let book = new Book({ ...args, author: author._id });
      author.books = [...author.books, book._id];
      await book.save();
      await author.save();
      book = await Book.findById(book._id).populate('author');
      pubsub.publish(SUBSCRIPTIONS.BOOK_ADDED, { bookAdded: book });
      return book;
    } catch (error) {
      throw new GraphQLError('error input user', {
        extensions: {
          code: 'BAD_BOOK_INPUT',
        },
      });
    }
  },

  addAuthor: async (root, args, context) => {
    const { currentUser } = context;
    if (!currentUser) {
      throw new GraphQLError('not authenticate', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }
    try {
      const author = new Author({ ...args });
      return author.save();
    } catch (error) {
      throw new GraphQLError('error input user', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.name,
        },
      });
    }
  },

  editAuthor: async (root, args, context) => {
    const { currentUser } = context;
    if (!currentUser) {
      throw new GraphQLError('not authenticate', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }
    let author = await Author.findOne({ name: args.name });
    if (!author) {
      throw new GraphQLError('the author doesn\'t exist', {
        extensions: {
          code: 'BAD_AUTHOR_INPUT',
          invalidArgs: args.author,
        },
      });
    }
    author.set({ born: args.born });
    await author.save();
    return author;
  },

  createUser: async (root, args) => {
    const user = new User({ ...args });
    return user.save().catch((error) => {
      throw new GraphQLError('creating user failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args,
          error,
        },
      });
    });
  },

  login: async (root, args) => {
    const user = await User.findOne({ username: args.username });

    if (!user || args.password !== 'secret') {
      throw new GraphQLError('credentials wrong', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args,
        },
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    return { value: jwt.sign(userForToken, process.env.SECRET) };
  },
};

module.exports = Mutation;
