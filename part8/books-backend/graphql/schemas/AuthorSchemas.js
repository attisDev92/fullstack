const AuthorSchema = `
  type Author {
    name: String!
    id: ID!
    born: Int
    books: [Book]
  }
`

module.exports = AuthorSchema