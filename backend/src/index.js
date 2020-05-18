const { GraphQLServer } = require('graphql-yoga');
require('dotenv').config(); 
const { Prisma } = require('prisma-binding');
const Mutation = require('./resolvers/Mutation.js'); 
const Query = require('./resolvers/Query.js'); 
const cookieParser = require('cookie-parser'); 
const jwt = require ('jsonwebtoken'); 

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
    prisma: db,
  }),
});

//db
const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  // endpoint: process.env.PRISMA_ENDPOINT,
  endpoint: process.env.PRISMA_PROD_ENDPOINT,
  // secret: process.env.PRISMA_SECRET, 
  debug: false
}); 
// express middleware to handle cookies 
server.express.use(cookieParser()); 
// express middleware to verify jwt 
server.express.use((req, res, next) => {
  const { token } = req.cookies; 
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET); 
    req.userId = userId; 
  }
  next(); 
}); 
// populate the user on each request 
server.express.use(async (req, res, next) => {
  if(!req.userId) return next(); 
  const user = await db.query.user({ where: {id: req.userId }}, 
    `{ id permissions email name }`); 
    req.user = user; 
    next(); 
}); 

server.start({
  cors: {
      credentials: true, // so not just anyone can crud data 
      origin: process.env.FRONTEND_URL, 
  },
},(details) => console.log(`GraphQL server is running on ${details.port}`));

module.exports = db; 