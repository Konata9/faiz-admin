import { ObjectType, Field, ID } from 'type-graphql'
import { prop as mongooseProps, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { User } from './user'

@ObjectType()
@modelOptions({ schemaOptions: { collection: 'userInfo' } })
export class UserInfo {
  @Field(() => ID)
  id: string

  @Field(types => User)
  @mongooseProps({ ref: User })
  userId: Ref<User>

  @Field()
  @mongooseProps()
  nickname: string

  @Field()
  @mongooseProps()
  avatar: string

  @Field()
  @mongooseProps()
  phone: string

  @Field()
  @mongooseProps()
  email: string
}

export const UserInfoModel = getModelForClass(UserInfo)