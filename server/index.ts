import 'module-alias/register'
import 'reflect-metadata'
import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'

import CONFIG from '@config'

import Database from '@database'
import schema from '@graphql'

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

  const app = express()
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: { req: express.Request }) => {
      const { headers } = req
      const token = headers.authorization || ''
      const user = getUser(token)
      return { user }
    }
  })

  const database = new Database()
  database.init()

  app.use(bodyParser.json())

  apolloServer.applyMiddleware({ app, path: gqlPath })

  app.listen(port, host, null, () => {
    console.info(`Server lunched: http://${host}:${port}`)
  })
})()