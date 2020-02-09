import 'reflect-metadata'
import { resolve } from 'path'

import * as Koa from 'koa'
import jwt from 'koa-jwt'
import * as bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'

import * as webpack from 'webpack'
import * as koaWebpack from 'koa-webpack'

import CONFIG from './config'

import Database from './src/database'
import router from './src/router'

import schema from './src/graphql'

(async function () {
  const { server: { port, host } } = CONFIG

  const webpackConfig = require(resolve(__dirname, '../webpack/webpack.dev.config.js'))
  const compiler = webpack(webpackConfig)
  const middleware = await koaWebpack({ compiler })

  const app = new Koa()
  const apolloServer = new ApolloServer({ schema })

  const database = new Database()
  database.init()

  app.use(middleware)
  app.use(bodyParser())

  apolloServer.applyMiddleware({ app })

  app.use(async (ctx, next) => {
    const { request: { url = '' } = {} } = ctx
    if (url.indexOf('graphql') === -1) {
      const filename = resolve(webpackConfig.output.path, 'index.html')
      ctx.response.type = 'html'
      ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    }
    next()
  });

  app.use(router.routes())
    .use(router.allowedMethods())

  app.listen(port, host, null, () => {
    console.info(`Server lunched: http://${host}:${port}`)
  })
})()