import gql from 'graphql-tag'
import request from '@utils/request'
import { IAccount } from '@interface/user'

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
export const GET_USERLIST = gql`
  query Users($username: String) {
    users(username: $username){
      id
      username
      roles{
        id
        name
        auths
      }
      createTime
      updateTime
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password:String!, $roles: [String!]){
    createUser(username: $username, password:$password, roles: $roles){
      id
    }
  }
`