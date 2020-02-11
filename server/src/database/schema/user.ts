import { prop, arrayProp, Typegoose } from 'typegoose'
import * as mongoose from 'mongoose'

const Schema = mongoose.Schema
export const UserSchema = new Schema({
  username: String,
  password: String,
  role: [String],
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
})

class User extends Typegoose {
  @prop()
  username: string

  @prop()
  password: string

  @arrayProp({ items: String })
  role: string[]

  @prop({ default: Date.now })
  createTime: Date

  @prop({ default: Date.now })
  updateTime: Date
}

export const UserModel = new User().getModelForClass(User)