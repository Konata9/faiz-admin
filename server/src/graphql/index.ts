import { buildSchemaSync } from 'type-graphql'
import UserResolver from './resolver/user'

const schema = buildSchemaSync({
  resolvers: [UserResolver]
})

export default schema