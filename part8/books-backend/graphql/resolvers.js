const Query = require("./resolvers/queries")
const Mutation = require( "./resolvers/mutations")
const { Subscription } = require("./resolvers/subscriptions")

const resolvers = {
  Query,
  Mutation,
  Subscription,
}

module.exports = resolvers