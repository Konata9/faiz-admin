import { observable, action } from 'mobx'
import { IAccount } from '../interface/user'

export interface IUserStore {
  userInfo: {}
  token: string
  isLogin: boolean
  login: (account: IAccount) => {}
  logout: () => void
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
    // TODO 使用 Graphql 向后端请求
    console.log('account', account)
  }

  @action
  async logout() {
    localStorage.clear()
    window.location.href = '/login'
  }
}

const userStore = new UserStore()
export default userStore