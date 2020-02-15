import { UsersModel } from '../database/schema/users'

export interface IAccount {
  id?: string
  username?: string
  password?: string
}

export async function checkUserExist(condition: IAccount) {
  try {
    return await UsersModel.exists({ ...condition })
  } catch (error) {
    console.error(error)
  }
}

export async function findUsers() {
  try {
    return await UsersModel.find()
  } catch (error) {
    console.error(error)
  }
}

export async function findUser(condition: IAccount) {
  try {
    return await UsersModel.findOne({ ...condition })
  } catch (error) {
    console.error(error)
  }
}

export async function createUser(userInfo: IAccount) {
  try {
    return await UsersModel.create(userInfo)
  } catch (error) {
    console.error(error)
  }
}
