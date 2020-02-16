import { UserInfoModel } from '@src/graphql/schema/userInfo'

export const getUserInfoById = async (id: string) => {
  try {
    return await UserInfoModel.findById(id)
  } catch (error) {
    console.log(error)
  }
}

export const getUserInfoByUserId = async (userId: string) => {
  try {
    return await UserInfoModel.findOne({ userId })
  } catch (error) {
    console.log(error)
  }
}