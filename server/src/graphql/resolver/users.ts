import { Resolver, Query, Arg } from 'type-graphql'
import { checkUserExist, findUser, findUsers } from '@controller/users'
import { decryptFrontendValue, encryptValue, encryptValeUseSHA } from '@utils'
import { Users } from '@graphql/schema/users'

@Resolver(Users)
class UsersResolver {

  @Query(returns => Boolean, { nullable: true })
  async checkUserExist(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    return await checkUserExist({ username, password })
  }

  @Query(returns => Users, { nullable: true })
  async user(
    @Arg('id') id?: string,
    @Arg('username') username?: string,
    @Arg('password') password?: string
  ) {
    // decrypt the password from front, and encrypted use backend secret
    const rawPassword = decryptFrontendValue(password)
    const encryptedPassword = encryptValeUseSHA(encryptValue(rawPassword)).toString()

    const user = await findUser({ id, username, password: encryptedPassword })
    console.log(user)
    if (user) {
      return user
    }

    return null
  }

  @Query(returns => [Users])
  async users() {
    return await findUsers()
  }
}

export default UsersResolver