import { ObjectType, Field, ID } from 'type-graphql'
import { prop as mongooseProps, arrayProp, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { Role } from './role'

@ObjectType()
@modelOptions({ schemaOptions: { collection: 'user' } })
export class User {
  @Field(() => ID)
  id: string

  @Field()
  token: string

  @Field()
  @mongooseProps()
  username: string

  @Field()
  @mongooseProps()
  password: string

  @Field(types => [Role])
  @arrayProp({ itemsRef: Role })
  roles: Ref<Role>[]

  @Field()
  @mongooseProps({ default: Date.now })
  createTime: Date

  @Field()
  @mongooseProps({ default: Date.now })
  updateTime: Date
}

export const UserModel = getModelForClass(User)