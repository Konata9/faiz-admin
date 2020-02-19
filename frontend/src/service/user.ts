import gql from 'graphql-tag'
import request from '@utils/request'
import { IAccount } from '@interface/user'

export interface IUserInfo {
  nickname: string
  avatar: string
  phone: string
  email: string
}

export const login = async (data: IAccount) => {
  const response = await request.post('/login', {
    ...data
  })

  return response
}

export const GET_USERINFO = gql`
  query UserInfo($userId: String!){
    userInfo(userId: $userId){
      nickname
      avatar
      phone
      email
    }
  }
`