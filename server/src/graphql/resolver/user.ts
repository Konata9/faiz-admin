import { Resolver, Query } from 'type-graphql'
import UserSchema from '../schema/user'

import { getUsers } from '../../controller/user'

@Resolver(UserSchema)
class UserResolver {

  @Query(returns => [UserSchema])
  async Users() {
    return await getUsers()
  }
}

export default UserResolver