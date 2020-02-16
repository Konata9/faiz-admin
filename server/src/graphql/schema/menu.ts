import { ObjectType, Field, ID } from 'type-graphql'
import { prop as mongooseProps, arrayProp, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Schema } from 'mongoose'

@ObjectType()
class Submenu {
  @Field()
  name?: string

  @Field()
  link?: string
}

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

  @Field(types => [Submenu])
  @arrayProp({
    items:
      Schema.Types.Mixed,
    default: [{ name: '', link: '' }]
  })
  submenu: Schema.Types.Mixed[]

  @Field()
  @mongooseProps({ default: Date.now })
  createTime: Date

  @Field()
  @mongooseProps({ default: Date.now })
  updateTime: Date
}

export const MenuModel = getModelForClass(Menu)