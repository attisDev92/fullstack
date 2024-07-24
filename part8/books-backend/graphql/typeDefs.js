const authorMutations = require('./mutations/authorMutations')
const booksMutations = require('./mutations/booksMutations')
const userMutations = require('./mutations/userMutations')
const authorQueries = require('./queries/authorQueries')
const booksQueries = require('./queries/booksQueries')
const AuthorSchema = require('./schemas/AuthorSchemas')
const BooksSchema = require('./schemas/booksSchemas')
const UserSchema = require('./schemas/userSchema')

const typeDefs = `
  enum YesNo {
    YES
    NO
  }
  ${AuthorSchema}
  ${UserSchema}
  ${BooksSchema}

  type Query {
    ${authorQueries}
    ${booksQueries}
    me: User
  }

  type Mutation {
    ${authorMutations}
    ${booksMutations}
    ${userMutations}
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs