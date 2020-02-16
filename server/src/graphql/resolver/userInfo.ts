import { Resolver, Query, Arg } from 'type-graphql'
import { UserInfo } from '@graphql/schema/userInfo'
import { getUserInfoByUserId } from '@controller/userInfo'

@Resolver(UserInfo)
class UserInfoResolver {
  @Query(returns => UserInfo)
  async userInfo(
    @Arg("userId") userId: string
  ) {
    return await getUserInfoByUserId(userId)
  }
}

export default UserInfoResolver