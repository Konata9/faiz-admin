import 'module-alias/register'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import { ApolloServer } from 'apollo-server-express'

import CONFIG from '@config'
import { verifyUser } from '@utils'
import router from '@router'
import Database from './database'
import schema from '@graphql'

(async function () {
  const { server: { port, host }, gqlPath, auth: { secret } } = CONFIG

  const app = express()
  const database = new Database()
  database.init()

  app.use(cors())
  app.use(bodyParser.json())
  app.use('/api', router)
  app.use(jwt({ secret }).unless({
    path: [
      '/api/login',
      '/api/signup'
    ]
  }))

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: { req: express.Request }) => {
      const { headers } = req
      const token = headers.authorization || ''
      if (token) {
        const user = verifyUser(token)
        return { user }
      }
    }
  })
  apolloServer.applyMiddleware({ app, path: gqlPath })

  app.listen(port, host, null, () => {
    console.info(`Server lunched: http://${host}:${port}`)
  })
})()