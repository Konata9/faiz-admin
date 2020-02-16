import { buildSchemaSync } from 'type-graphql'
import UsersResolver from './resolver/users'

const schema = buildSchemaSync({
  resolvers: [UsersResolver]
})

export default schema