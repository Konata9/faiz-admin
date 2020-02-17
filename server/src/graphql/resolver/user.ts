import { Resolver, Query, Arg } from 'type-graphql'
import { checkUserExist, findUserById, findUsers } from '@src/controller/user'
import { User } from '@graphql/schema/user'

@Resolver(User)
class UserResolver {

  @Query(returns => Boolean, { nullable: true })
  async checkUserExist(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    return await checkUserExist({ username, password })
  }

  @Query(returns => String, { nullable: true })
  async user(
    @Arg('id') id?: string,
  ) {
    return await findUserById(id)
  }

  @Query(returns => [User], { nullable: true })
  async users() {
    return await findUsers()
  }
}

export default UserResolver