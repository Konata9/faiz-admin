import { observable, action } from 'mobx'
import { IAccount } from '../interface/user'
import { login } from '@service/user'
import { STORAGE_KEYS, RESPONSE_STATUS } from '@constants'
import { encryptedValue } from '@utils'

export interface IUserStore {
  id: string | null,
  userInfo: {}
  token: string | null
  isLogin: boolean
  checkTokenInStore: () => void
  login: (account: IAccount) => (Promise<{ status: string }>)
  logout: () => void
}

class UserStore {
  @observable
  id = ''

  @observable
  userInfo = {}

  @observable
  token: string | null = null

  @observable
  isLogin = false

  @action.bound
  checkTokenInStore() {
    this.token = this.token || localStorage.getItem(STORAGE_KEYS.TOKEN)
  }

  @action.bound
  async login(account: IAccount) {
    const { username, password } = account
    const { data } = await login({ username, password: encryptedValue(password) })
    if (data) {
      const { id, token } = data
      localStorage.setItem(STORAGE_KEYS.ID, id)
      localStorage.setItem(STORAGE_KEYS.TOKEN, token)

      this.id = id
      this.token = token

      return { status: RESPONSE_STATUS.SUCCESS }
    }

    return { status: RESPONSE_STATUS.FAILED }
  }

  @action
  logout() {
    localStorage.clear()
    window.location.href = '/login'
  }
}

const userStore = new UserStore()
export default userStore