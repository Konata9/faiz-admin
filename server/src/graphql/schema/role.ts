import { ObjectType, ID, Field } from 'type-graphql'
import { prop as mongooseProps, getModelForClass, arrayProp, modelOptions } from '@typegoose/typegoose'
import { Types } from 'mongoose'

@ObjectType()
@modelOptions({ schemaOptions: { collection: 'role' } })
export class Role {
  @Field(() => ID)
  id: string

  @Field()
  @mongooseProps()
  name: string

  @Field(types => [String])
  @arrayProp({ items: String })
  auths: [String]

  @Field()
  @mongooseProps({ default: Date.now })
  createTime: Date

  @Field()
  @mongooseProps({ default: Date.now })
  updateTime: Date
}

export const RoleModel = getModelForClass(Role)