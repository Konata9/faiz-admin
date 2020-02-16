import { ObjectType, Field, ID } from 'type-graphql'
import { prop as mongooseProps, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { Users } from './users'


@ObjectType()
@modelOptions({ schemaOptions: { collection: 'userInfos' } })
export class UserInfos {
  @Field(() => ID)
  id: string

  @Field(() => Users)
  @mongooseProps({ ref: 'users', foreignField: 'users', localField: '_id' })
  userId: Ref<Users>

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

  @Field(() => Object)
  @mongooseProps()
  extra: Object
}

export const UserInfosModel = getModelForClass(UserInfos)