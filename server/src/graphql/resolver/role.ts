import { Resolver, Query, Arg } from 'type-graphql'
import { Role } from '@src/graphql/schema/role'
import { getRoles, getRole } from '@controller/role'

@Resolver(Role)
class RolesResolver {

  @Query(returns => Role)
  async role(
    @Arg("id") id: string
  ) {
    try {
      return await getRole(id)
    } catch (error) {
      console.log(error)
    }
  }

  @Query(returns => [Role])
  async roles() {
    try {
      return await getRoles()
    } catch (error) {
      console.log(error)
    }
  }
}

export default RolesResolver