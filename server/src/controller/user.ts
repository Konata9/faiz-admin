import { UserModel } from '../database/schema/user'

export interface IAccount {
  userId?: string
  username?: string
  password?: string
}

export async function checkUserExist({ username, password }: IAccount) {
  try {
    return await UserModel.exists({ username, password })
  } catch (error) {
    console.error(error)
  }
}

export async function getUsers() {
  try {
    return await UserModel.find()
  } catch (error) {
    console.error(error)
  }
}

export async function getUser(condition: IAccount) {
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
