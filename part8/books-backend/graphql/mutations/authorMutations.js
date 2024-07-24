const authorMutations = `
  addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      born: Int!
    ): Author
`
module.exports = authorMutations