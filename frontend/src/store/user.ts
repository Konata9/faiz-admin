import { observable, action } from 'mobx'
import { queryGQL } from '@src/client'
import { login, GET_USERINFO, GET_USERLIST } from '@service/user'
import { IRole } from './role'
import { STORAGE_KEYS, RESPONSE_STATUS } from '@constants'
import { encryptedValue } from '@utils'

export interface IUserInfo {
  nickname: string
  avatar: string
  phone: string
  email: string
}

interface IUser {
  username: string
  roles: Array<IRole>
  createTime: string
  updateTime: string
}

export class UserStore {
  @observable
  id: string = localStorage.getItem(STORAGE_KEYS.ID) || ''

  @observable
  token: string | null = localStorage.getItem(STORAGE_KEYS.TOKEN) || null

  @observable
  userInfo: IUserInfo | null = null

  @observable
  userList: Array<IUser> = []

  @action.bound
  async getUserInfo(userId: string) {
    const { name: caller } = this.getUserInfo
    const { userInfo } = await queryGQL({
      query: GET_USERINFO,
      variables: { userId },
      caller
    })
    this.userInfo = userInfo
  }

  @action.bound
  async getUserList() {
    const { name: caller } = this.getUserList
    const { users } = await queryGQL({ query: GET_USERLIST, caller })
    this.userList = users
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