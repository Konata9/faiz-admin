const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: String,
  password: String,
  role: [String],
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)
