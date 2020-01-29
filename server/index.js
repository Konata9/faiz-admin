const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const { ApolloServer, gql } = require('apollo-server-koa')

const { server } = require('./config')
const Database = require('./src/database')
const router = require('./src/router')

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = gql`
type Book {
  title: String
  author: String
}

type Query {
  books: [Book]
}
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const app = new Koa()
const apolloServer = new ApolloServer({ typeDefs, resolvers })

const database = new Database()
database.init()

app.use(bodyParser())

app.use(router.routes())
  .use(router.allowedMethods())

apolloServer.applyMiddleware({ app })

app.listen(server.port, server.host, () => {
  console.info(`Server lunched: http://${server.host}:${server.port}`)
})