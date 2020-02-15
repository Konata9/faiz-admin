import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Users } from './users'

export class UserInfos {
  @prop({ ref: 'Users' })
  userId: Ref<Users>

  @prop()
  nickname: string

  @prop()
  avatar: string

  @prop()
  phone: string

  @prop()
  email: string

  @prop()
  extra: Object
}

export const UserInfosModel = getModelForClass(UserInfos)