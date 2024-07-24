
const userMutations = `
  createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
`

module.exports = userMutations