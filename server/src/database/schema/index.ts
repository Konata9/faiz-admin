import * as UserSchema from './users'
import * as UserInfoSchema from './userInfos'
import * as RoleSchema from './roles'
import * as MenuSchema from './menu'

export default {
  ...UserSchema,
  ...UserInfoSchema,
  ...RoleSchema,
  ...MenuSchema
}