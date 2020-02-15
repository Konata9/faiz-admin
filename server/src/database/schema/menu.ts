import { prop, arrayProp, getModelForClass } from '@typegoose/typegoose'

export class Menu {
  @prop()
  name: string

  @prop()
  link: string

  @arrayProp({ items: Object })
  submenu: Object[]

  @prop({ default: Date.now })
  createTime: Date

  @prop({ default: Date.now })
  updateTime: Date
}

export const MenuModel = getModelForClass(Menu)