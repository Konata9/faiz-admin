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
}