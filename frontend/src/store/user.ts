import { action } from 'mobx'
// import { gql } from 'graphql'
import client from '../client'

import { IAccount } from '../interface/user'

export interface IUserStore {
  login: (account: IAccount) => {}
}

// const loginQuery = gql`
//   Query{
//     checkUserExist
//   }
// `

class UserStore {

  @action
  async login(account: IAccount) {
    const { username, password } = account
    console.log('account', account)

    // client.query()
  }
}

const userStore = new UserStore()
export default userStore