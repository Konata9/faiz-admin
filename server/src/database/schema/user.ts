import * as mongoose from 'mongoose'

const Schema = mongoose.Schema
export const UserSchema = new Schema({
  username: String,
  password: String,
  role: [String],
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
})

export const UserModel = mongoose.model('User', UserSchema)