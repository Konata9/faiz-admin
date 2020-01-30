import UserModel from '../database/schema/user'

export async function createUser(userInfo: any) {
  try {
    await UserModel.create(userInfo)
  } catch (error) {
    console.error(error)
  }
}
