import 'module-alias/register'
import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'

import CONFIG from '@config'
import { verifyUser } from '@utils'
import router from '@router'
import Database from '@database'
import schema from '@graphql'

(async function () {
  const { server: { port, host }, gqlPath } = CONFIG

  const app = express()
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: { req: express.Request }) => {
      const { headers } = req
      const token = headers.authorization || ''
      const user = verifyUser(token)
      return { user }
    }
  })

  const database = new Database()
  database.init()

  app.use(bodyParser.json())
  app.use('/api', router)
  apolloServer.applyMiddleware({ app, path: gqlPath })

  app.listen(port, host, null, () => {
    console.info(`Server lunched: http://${host}:${port}`)
  })
})()