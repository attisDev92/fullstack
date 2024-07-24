const BooksSchema = `
  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String!]!
    id: ID!
  }
`

module.exports = BooksSchema