import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class UserSchema {
  @Field()
  username: string

  @Field()
  password: string

  @Field(type => [String])
  role: string[]

  @Field()
  createTime: Date

  @Field()
  updateTime: Date
}

export default UserSchema