import { resolve } from 'path'

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { ApolloServer, gql } from 'apollo-server-koa'

import * as webpack from 'webpack'
import devMiddleware from './src/middleware/devMiddleware'

const compiler = webpack(require(resolve(__dirname, '../webpack/webpack.dev.config.js')))

import CONFIG from './config'
const { server: { port, host } } = CONFIG

import Database from './src/database'
import router from './src/router'

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

const typeDefs = gql`
type Book {
  title: String
  author: String
}

type Query {
  books: [Book]
}
`

const resolvers = {
  Query: {
    books: () => books,
  },
};

const app = new Koa()
const apolloServer = new ApolloServer({ typeDefs, resolvers })

const database = new Database()
database.init()

app.use(devMiddleware(compiler, { publicPath: '/' }))

app.use(bodyParser())

app.use(router.routes())
  .use(router.allowedMethods())

apolloServer.applyMiddleware({ app })

app.listen(port, host, null, () => {
  console.info(`Server lunched: http://${host}:${port}`)
})