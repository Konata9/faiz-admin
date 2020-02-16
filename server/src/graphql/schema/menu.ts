import { ObjectType, Field, ID } from 'type-graphql'
import { prop as mongooseProps, arrayProp, getModelForClass, modelOptions } from '@typegoose/typegoose'

@ObjectType()
@modelOptions({ schemaOptions: { collection: 'menu' } })
export class Menu {
  @Field(() => ID)
  id: string

  @Field()
  @mongooseProps()
  name: string

  @Field()
  @mongooseProps()
  link: string

  @Field(() => [Object])
  @arrayProp({ items: Object })
  submenu: Object[]

  @Field()
  @mongooseProps({ default: Date.now })
  createTime: Date

  @Field()
  @mongooseProps({ default: Date.now })
  updateTime: Date
}

export const MenuModel = getModelForClass(Menu)