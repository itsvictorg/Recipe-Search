const express = require('express');
// import apollo which includes our graphql visual interface
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// we require an auth function to pass below as context
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// server will be an apolloServer and each call will be a new instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//  ALL PRACTICE APPS HAVE THIS AS EXTENDED FALSE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, this app - serve client/build as static assets only *no others
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

// server this compiled output index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to call the apollo server
startApolloServer(typeDefs, resolvers);