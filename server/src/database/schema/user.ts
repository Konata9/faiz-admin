import * as mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: String,
  password: String,
  role: [String],
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
})

export default mongoose.model('User', UserSchema)