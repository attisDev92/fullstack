
const typeDefs = `

  enum YesNo {
    YES
    NO
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    books: [Book]
  }
  
  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String!]!
    id: ID!
  }

  type Query {

    authorsCount: Int!

    booksCount: Int!

    allBooks(
      author: String
      genre: String
    ): [Book!]!

    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ) : Author
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

module.exports = typeDefs