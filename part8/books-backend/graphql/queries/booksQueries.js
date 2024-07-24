
const booksQueries = `
  booksCount: Int!
  allBooks(
    author: String
    genre: String
  ): [Book!]!
`

module.exports = booksQueries