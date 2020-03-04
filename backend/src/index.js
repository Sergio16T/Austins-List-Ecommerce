const { GraphQLServer } = require('graphql-yoga');
require('dotenv').config(); 
const { Prisma } = require('prisma-binding');
const Mutation = require('./resolvers/Mutation.js'); 
const Query = require('./resolvers/Query.js'); 
const cookieParser = require('cookie-parser'); 


const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers : {
    Query: Query,
    Mutation: Mutation
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
},
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      // secret: process.env.PRISMA_SECRET, 
      debug: false
    }),
  }),
});

// express middleware to handle cookies 
server.express.use(cookieParser()); 

server.start({
  cors: {
      credentials: true, // so not just anyone can crud data 
      origin: process.env.FRONTEND_URL, 
  },
},(details) => console.log(`GraphQL server is running on ${details.port}`));