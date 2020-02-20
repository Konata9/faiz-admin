import { observable, action } from 'mobx'
import { queryGQL } from '@src/client'
import { GET_ROLE, GET_ROLELIST } from '@service/role'

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
  async getRoles() {
    const caller = this.getRoles.name
    const { roles } = await queryGQL({ query: GET_ROLELIST, caller })
    this.roleList = roles
  }
}

const roleStore = new RoleStore()
export default roleStore