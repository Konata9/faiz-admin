import { observable, action } from 'mobx'
import { queryGQL } from '@src/client'
import { login, GET_USERINFO, IUserInfo } from '@service/user'
import { STORAGE_KEYS, RESPONSE_STATUS } from '@constants'
import { encryptedValue } from '@utils'

export class UserStore {
  @observable
  id: string = localStorage.getItem(STORAGE_KEYS.ID) || ''

  @observable
  userInfo: IUserInfo = { nickname: '', avatar: '', phone: '', email: '' }

  @observable
  token: string | null = localStorage.getItem(STORAGE_KEYS.TOKEN) || null

  @action.bound
  async getUserInfo(userId: string) {
    const { name: caller } = this.getUserInfo
    const { userInfo } = await queryGQL(GET_USERINFO, { userId }, caller)
    this.userInfo = userInfo
  }

  @action.bound
  async login(account: ({ username: string, password: string })): Promise<{ status: string }> {
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

  @action.bound
  logout(): void {
    localStorage.clear()
    window.location.href = '/login'
  }
}

const userStore = new UserStore()
export default userStore