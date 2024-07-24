const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { expressMiddleware } = require('@apollo/server/express4');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { PubSub } = require('graphql-subscriptions');
const express = require('express');
const cors = require('cors');
const http = require('http');
const jwt = require('jsonwebtoken');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const User = require('./models/User');

require('dotenv').config();
require('./config/db'); // Conectar a la base de datos

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const pubSub = new PubSub();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer(
    {
      schema,
      onConnect: async (ctx) => {
        console.log('WebSocket connected');
        return { pubSub };
      },
      onDisconnect: async (ctx) => {
        console.log('WebSocket disconnected');
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
          const token = auth.substring(7);
          try {
            const decodedToken = jwt.verify(token, process.env.SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser, pubSub };
          } catch (error) {
            console.error('Error decoding token:', error.message);
            return { pubSub };
          }
        }

        return { pubSub };
      },
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`server start on http://localhost:${PORT}/graphql port`);
  });
};

start();
