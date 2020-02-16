import { Resolver, Query, Arg } from 'type-graphql'
import { Menu } from '@graphql/schema/menu'
import { getMenu } from '@controller/menu'

@Resolver(Menu)
class MenuResolver {

  @Query(returns => [Menu], { nullable: true })
  async menu() {
    try {
      return await getMenu()
    } catch (error) {
      console.log(error)
    }
  }
}

export default MenuResolver