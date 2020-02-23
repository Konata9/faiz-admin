import { observable, action } from 'mobx'
import { queryGQL, mutateGQL } from '@src/client'
import { login, GET_USERINFO, GET_USERLIST, CREATE_USER } from '@service/user'
import { watchLoading } from './global'
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
  password?: string
  roles?: Array<IRole>
  createTime?: string
  updateTime?: string
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
  @watchLoading()
  async getUserInfo(userId: string) {
    const { userInfo } = await queryGQL({
      query: GET_USERINFO,
      variables: { userId },
    })
    this.userInfo = userInfo
  }

  @action.bound
  @watchLoading()
  async getUserList(username?: string) {
    const variables = username ? { username } : undefined
    const { users } = await queryGQL({ query: GET_USERLIST, variables })
    this.userList = users
  }

  @action.bound
  @watchLoading()
  async createUser(user: IUser) {
    const { username, password, roles } = user
    try {
      await mutateGQL({
        mutation: CREATE_USER, variables: {
          username,
          password: encryptedValue(password),
          roles
        }
      })
      await this.getUserList()
      return { status: RESPONSE_STATUS.SUCCESS }
    } catch (error) {
      return { status: RESPONSE_STATUS.FAILED }
    }
  }

  @action.bound
  @watchLoading()
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
  @watchLoading()
  logout(): void {
    localStorage.clear()
    window.location.href = '/login'
  }
}

const userStore = new UserStore()
export default userStore