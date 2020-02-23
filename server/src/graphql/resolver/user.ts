import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { checkUserExist, findUserById, findUsers, createUser } from '@src/controller/user'
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
  async users(
    @Arg('username', { nullable: true }) username?: string
  ) {
    const condition = username ? { username } : {}
    return await findUsers(condition)
  }

  @Mutation(returns => User)
  async createUser(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('roles', type => [String], { nullable: true }) roles?: string[]
  ) {
    return await createUser({
      username,
      password,
      roles,
    })
  }
}

export default UserResolver