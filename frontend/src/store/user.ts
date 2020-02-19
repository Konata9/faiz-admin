import { observable, action } from 'mobx'
import { login } from '@service/user'
import { STORAGE_KEYS, RESPONSE_STATUS } from '@constants'
import { encryptedValue } from '@utils'

export class UserStore {
  @observable
  id: string | null = localStorage.getItem(STORAGE_KEYS.ID) || null

  @observable
  userInfo: Object = {}

  @observable
  token: string | null = localStorage.getItem(STORAGE_KEYS.TOKEN) || null

  @action.bound
  checkTokenInStore() {
    this.token = this.token || localStorage.getItem(STORAGE_KEYS.TOKEN)
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

  @action
  logout(): void {
    localStorage.clear()
    window.location.href = '/login'
  }
}

const userStore = new UserStore()
export default userStore