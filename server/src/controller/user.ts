import { UserModel } from '../database/schema/user'

export interface IAccount {
  id?: string
  username?: string
  password?: string
}

export async function checkUserExist(condition: IAccount) {
  try {
    return await UserModel.exists({ ...condition })
  } catch (error) {
    console.error(error)
  }
}

export async function findUsers() {
  try {
    return await UserModel.find()
  } catch (error) {
    console.error(error)
  }
}

export async function findUser(condition: IAccount) {
  try {
    return await UserModel.findOne({ ...condition })
  } catch (error) {
    console.error(error)
  }
}

export async function createUser(userInfo: any) {
  try {
    await UserModel.create(userInfo)
  } catch (error) {
    console.error(error)
  }
}
