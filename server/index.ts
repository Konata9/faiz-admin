import { resolve } from 'path'

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { ApolloServer, gql } from 'apollo-server-koa'

import * as webpack from 'webpack'
import * as koaWebpack from 'koa-webpack'

import CONFIG from './config/index'

import Database from './src/database/index'
import router from './src/router/index'

(async function () {

  const { server: { port, host } } = CONFIG

  const webpackConfig = require(resolve(__dirname, '../webpack/webpack.dev.config.js'))
  const compiler = webpack(webpackConfig)
  const middleware = await koaWebpack({ compiler })

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

  app.use(middleware)
  app.use(async (ctx) => {
    const filename = resolve(webpackConfig.output.path, 'index.html')
    ctx.response.type = 'html'
    ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
  })

  app.use(bodyParser())

  app.use(router.routes())
    .use(router.allowedMethods())

  apolloServer.applyMiddleware({ app })

  app.listen(port, host, null, () => {
    console.info(`Server lunched: http://${host}:${port}`)
  })
})()