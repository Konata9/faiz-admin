import { action } from 'mobx'
import { gql } from 'apollo-boost'
import client, { queryGQL } from '../client'

import { IAccount } from '../interface/user'

export interface IUserStore {
  login: (account: IAccount) => {}
}

class UserStore {

  @action
  async login(account: IAccount) {
    const { username, password } = account
    const loginQuery = gql`{
      checkUserExist(username: "${username}", password: "${password}")
    }`

    console.log('account', account)
    const { data: { checkUserExist } } = await queryGQL(loginQuery) || {}
    console.log('result', checkUserExist)
  }
}

const userStore = new UserStore()
export default userStore