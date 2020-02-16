import * as UserSchema from './user'
import * as UserInfoSchema from './userInfo'
import * as RoleSchema from './role'
import * as MenuSchema from './menu'

export default {
  ...UserSchema,
  ...UserInfoSchema,
  ...RoleSchema,
  ...MenuSchema
}