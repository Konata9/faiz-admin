import 'reflect-metadata'
import { resolve } from 'path'

import * as Koa from 'koa'
import * as jwt from 'koa-jwt'
import * as jsonwebtoken from 'jsonwebtoken'
import * as bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'

import * as webpack from 'webpack'
import * as koaWebpack from 'koa-webpack'

import CONFIG from './config'

import Database from './src/database'
import schema from './src/graphql'

(async function () {
  const { server: { port, host }, gqlPath, auth: { secret } } = CONFIG

  const webpackConfig = require(resolve(__dirname, '../webpack/webpack.dev.config.js'))
  const compiler = webpack(webpackConfig)
  const middleware = await koaWebpack({ compiler })

  const getUser = (token: string) => {
    try {
      if (token) {
        return jsonwebtoken.verify(token, secret)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const app = new Koa()
  const apolloServer = new ApolloServer({
    schema,
    context: ({ ctx }: { ctx: Koa.Context }) => {
      const { request: { headers } } = ctx
      console.log(ctx)

      const token = headers.authorization || ''
      const user = getUser(token)
      return { user, models: {} }
    }
  })

  const database = new Database()
  database.init()

  app.use(middleware)
  app.use(bodyParser())

  apolloServer.applyMiddleware({ app, path: gqlPath })

  app.use(async (ctx, next) => {
    const { request: { url = '' } = {} } = ctx
    console.log('ctx', ctx)
    if (url.indexOf('graphql') === -1) {
      const filename = resolve(webpackConfig.output.path, 'index.html')
      ctx.response.type = 'html'
      ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    }
    next()
  });

  app.listen(port, host, null, () => {
    console.info(`Server lunched: http://${host}:${port}`)
  })
})()