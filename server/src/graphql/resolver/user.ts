import { Resolver, Query, Arg } from 'type-graphql'
import UserSchema from '../schema/user'

import { checkUserExist, getUsers } from '../../controller/user'

@Resolver(UserSchema)
class UserResolver {

  @Query(returns => Boolean, { nullable: true })
  async checkUserExist(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    return await checkUserExist({ username, password })
  }

  @Query(returns => [UserSchema])
  async users() {
    return await getUsers()
  }
}

export default UserResolver