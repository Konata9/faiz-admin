import { observable, action } from 'mobx'
import { queryGQL, mutateGQL } from '@src/client'
import { RESPONSE_STATUS } from '@constants'
import { GET_ROLE, GET_ROLELIST, CREATE_ROLE } from '@service/role'
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
  async getRoles(name?: string) {
    const variables = name ? { name } : undefined
    const { roles } = await queryGQL({ query: GET_ROLELIST, variables })
    this.roleList = roles
  }

  @action.bound
  @watchLoading()
  async createRole(roleInfo: ({ name: string })) {
    try {
      await mutateGQL({ mutation: CREATE_ROLE, variables: { ...roleInfo } })
      await this.getRoles()
      return { status: RESPONSE_STATUS.SUCCESS }
    } catch (error) {
      console.error(error)
      return { status: RESPONSE_STATUS.FAILED }
    }
  }
}

const roleStore = new RoleStore()
export default roleStore