import { UsersModel } from '../graphql/schema/users'

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

export async function findUser(condition: any = {}) {
  try {
    const { id: _id, ...rest } = condition
    return await UsersModel.findOne({ _id, ...rest }, { password: false })
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
