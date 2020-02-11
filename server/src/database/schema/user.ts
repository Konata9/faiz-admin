import { prop, arrayProp, getModelForClass } from '@typegoose/typegoose'

class User {
  @prop()
  username: string

  @prop()
  password: string

  @arrayProp({ items: String })
  role: string[]

  @prop({ default: Date.now })
  createTime: Date

  @prop({ default: Date.now })
  updateTime: Date
}

export const UserModel = getModelForClass(User)