const Author = require('../../models/Author')
const Book = require('../../models/Book')

Query = {
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
}

module.exports = Query