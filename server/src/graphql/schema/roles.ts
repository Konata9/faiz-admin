import { ObjectType, ID, Field } from 'type-graphql'
import { prop as mongooseProps, getModelForClass, arrayProp, modelOptions } from '@typegoose/typegoose'
import { Types } from 'mongoose'

@ObjectType()
@modelOptions({ schemaOptions: { collection: 'roles' } })
export class Roles {
  @Field(() => ID)
  id: string

  @Field()
  @mongooseProps()
  name: string

  @Field(() => [String])
  @arrayProp({ items: String })
  auths: string[]

  @Field()
  @mongooseProps({ default: Date.now })
  createTime: Date

  @Field()
  @mongooseProps({ default: Date.now })
  updateTime: Date
}

export const RolesModel = getModelForClass(Roles)