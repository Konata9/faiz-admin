import { observable, action } from 'mobx'
import { queryGQL } from '@src/client'
import { GET_ROLE, GET_ROLELIST } from '@service/role'
import { watchLoading } from './global'

export interface IRole {
  id: string
  name: string
  auths: Array<String>
  createTime: string
  updateTime: string
}

export class RoleStore {
  @observable
  id: string = ''

  @observable
  roleInfo: IRole | null = null

  @observable
  roleList: Array<IRole> = []

  @action.bound
  @watchLoading()
  async getRoles() {
    const { roles } = await queryGQL({ query: GET_ROLELIST })
    this.roleList = roles
  }

  @action.bound
  @watchLoading()
  async createRole() {

  }
}

const roleStore = new RoleStore()
export default roleStore