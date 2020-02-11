import { observable, action } from 'mobx'

import { IAccount } from '../interface/user'

export interface IUserStore {
  userInfo: {}
  token: string
  isLogin: boolean
  login: (account: IAccount) => {}
}

class UserStore {

  @observable
  userInfo = {}

  @observable
  token = ''

  @observable
  isLogin = false

  @action
  async login(account: IAccount) {
    const { username, password } = account

    console.log('account', account)
  }
}

const userStore = new UserStore()
export default userStore