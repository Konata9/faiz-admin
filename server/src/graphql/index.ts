import { buildSchemaSync } from 'type-graphql'
import UserResolver from '@graphql/resolver/user'
import UserInfoResolver from '@graphql/resolver/userInfo'
import RoleResolver from '@graphql/resolver/role'
import MenuResolver from '@graphql/resolver/menu'

const schema = buildSchemaSync({
  resolvers: [
    UserResolver,
    UserInfoResolver,
    RoleResolver,
    MenuResolver
  ]
})

export default schema