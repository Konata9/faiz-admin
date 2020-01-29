const UserModel = require('../database/schema/user')

async function createUser(userInfo) {
  try {
    await UserModel.create(userInfo)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createUser
}