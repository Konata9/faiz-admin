import { ObjectType, Field, ID } from 'type-graphql'
import { prop as mongooseProps, arrayProp, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { Roles } from './roles'

@ObjectType()
@modelOptions({ schemaOptions: { collection: 'users' } })
export class Users {
  @Field(() => ID)
  id: string

  @Field()
  @mongooseProps()
  username: string

  @Field()
  @mongooseProps()
  password: string

  @Field(() => [Roles])
  @arrayProp({ ref: 'Roles' })
  roles: Ref<Roles>[]

  @Field()
  @mongooseProps({ default: Date.now })
  createTime: Date

  @Field()
  @mongooseProps({ default: Date.now })
  updateTime: Date
}

export const UsersModel = getModelForClass(Users)