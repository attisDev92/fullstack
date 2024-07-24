const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const SUBSCRIPTIONS = {
  BOOK_ADDED: 'BOOK_ADDED',
};

const Subscription = {
  bookAdded: {
    subscribe: () => pubsub.asyncIterator([SUBSCRIPTIONS.BOOK_ADDED]),
  },
};

module.exports = { Subscription, SUBSCRIPTIONS, pubsub };
