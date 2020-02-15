import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose'
import { Roles } from './roles'

export class Users {
  @prop()
  username: string

  @prop()
  password: string

  @arrayProp({ ref: 'Roles' })
  roles: Ref<Roles>[]

  @prop({ default: Date.now })
  createTime: Date

  @prop({ default: Date.now })
  updateTime: Date
}

export const UsersModel = getModelForClass(Users)