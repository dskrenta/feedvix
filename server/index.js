'use strict';

const { ApolloServer } = require('apollo-server');

const schema = require('./schema');
const resolvers = require('./resolvers');

const DEFAULT_PORT = 4000;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    return { };
  },
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || DEFAULT_PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
