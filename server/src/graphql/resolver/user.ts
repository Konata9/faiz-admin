import { Resolver, Query, Arg } from 'type-graphql'
import { checkUserExist, findUser, findUsers } from '@src/controller/user'
import { decryptFrontendValue, encryptValue, encryptValeUseSHA, generateJWT } from '@utils'
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
    return await findUser({ id })
  }

  @Query(returns => [User], { nullable: true })
  async users() {
    return await findUsers()
  }

  @Query(returns => String, { nullable: true })
  async loginToken(
    @Arg('username') username?: string,
    @Arg('password') password?: string
  ) {
    const rawPassword = decryptFrontendValue(password)
    const encryptedPassword = encryptValeUseSHA(encryptValue(rawPassword)).toString()

    const user = await findUser({ username, password: encryptedPassword })
    if (user) {
      const { id, username, updateTime } = user
      const token = generateJWT({ id, username, updateTime })
      return token
    }

    return null
  }
}

export default UserResolver