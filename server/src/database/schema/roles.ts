import { prop, getModelForClass, arrayProp } from '@typegoose/typegoose'

export class Roles {
  @prop()
  name: string

  @arrayProp({ items: String })
  auths: string[]

  @prop({ default: Date.now })
  createTime: Date

  @prop({ default: Date.now })
  updateTime: Date
}

export const RolesModel = getModelForClass(Roles)