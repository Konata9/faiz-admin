import { MenuModel } from '@graphql/schema/menu'

export const getMenu = async () => {
  try {
    return await MenuModel.find()
  } catch (error) {
    console.log(error)
  }
}