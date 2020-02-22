import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Role } from '@src/graphql/schema/role'
import { getRoles, getRole, createRole } from '@controller/role'

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
  async roles(
    @Arg("name", { nullable: true }) name?: string
  ) {
    try {
      const condition = name ? { name } : {}
      return await getRoles(condition)
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation(returns => Role)
  async createRole(
    @Arg("name") name: string,
  ) {
    try {
      return await createRole({ name, auths: [] })
    } catch (error) {
      console.log(error)
    }
  }
}

export default RolesResolver