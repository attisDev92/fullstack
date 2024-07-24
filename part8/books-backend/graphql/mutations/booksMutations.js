const booksMutations = `
  addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
`

module.exports = booksMutations