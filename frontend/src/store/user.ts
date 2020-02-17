import { observable, action } from 'mobx'
import { IAccount } from '../interface/user'
import { login } from '@service/user'
import { encryptedValue } from '@utils'

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

  @action.bound
  async login(account: IAccount) {
    const { username, password } = account
    console.log(password)
    const { data } = await login({ username, password: encryptedValue(password) })
    console.log('data', data)
  }

  @action
  async logout() {
    localStorage.clear()
    window.location.href = '/login'
  }
}

const userStore = new UserStore()
export default userStore