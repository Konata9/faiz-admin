import 'reflect-metadata'
import * as Koa from 'koa'
import * as jwt from 'koa-jwt'
import * as jsonwebtoken from 'jsonwebtoken'
import * as bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'

import CONFIG from './config'

import Database from './src/database'
import schema from './src/graphql'

(async function () {
  const { server: { port, host }, gqlPath, auth: { secret } } = CONFIG

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
      const token = headers.authorization || ''
      const user = getUser(token)
      return { user }
    }
  })

  const database = new Database()
  database.init()

  app.use(bodyParser())

  apolloServer.applyMiddleware({ app, path: gqlPath })

  app.listen(port, host, null, () => {
    console.info(`Server lunched: http://${host}:${port}`)
  })
})()