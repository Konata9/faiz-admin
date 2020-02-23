import { UserModel } from '@src/graphql/schema/user'
export interface IAccount {
  id?: string
  username?: string
  password?: string
  roles?: string[]
}

export async function checkUserExist(condition: IAccount) {
  try {
    return await UserModel.exists({ ...condition })
  } catch (error) {
    console.error(error)
  }
}

export async function findUsers(condition: any) {
  try {
    const users = await UserModel.find({ ...condition }, { password: false }).populate('roles').exec()
    return users
  } catch (error) {
    console.error(error)
  }
}

export async function findUserByAccount({ username, password }: IAccount) {
  try {
    return await UserModel.findOne({ username, password }, { password: false })
  } catch (error) {
    console.error(error)
  }
}

export async function findUserById(id: string) {
  try {
    return await UserModel.findById(id, { password: false })
  } catch (error) {
    console.error(error)
  }
}

export async function createUser(userInfo: IAccount) {
  try {
    return await UserModel.create({
      ...userInfo,
      createTime: new Date(),
      updateTime: new Date()
    })
  } catch (error) {
    console.error(error)
  }
}
