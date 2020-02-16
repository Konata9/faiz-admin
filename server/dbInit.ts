import 'module-alias/register'
import Database from './database'
import schemas from '@src/graphql/schema'
import { encryptValue, encryptValeUseSHA } from '@utils'

(async function () {
  const db = new Database()
  const { UserModel, UserInfoModel, RoleModel, MenuModel } = schemas

  await db.init()

  const initMenu = [
    {
      name: 'dashboard',
      link: '/',
    },
    {
      name: 'system',
      link: '/system',
      submenu: [
        {
          name: 'system_user',
          link: '/system/user'
        },
        {
          name: 'system_role',
          link: '/system/role'
        }
      ]
    }
  ]

  const insertedMenu = await MenuModel.insertMany(initMenu)

  const initRole = {
    name: '管理员',
    auths: ['all'],
  }

  const { _id: roleId } = await RoleModel.create(initRole)

  const initUser = {
    username: 'admin',
    password: encryptValeUseSHA(encryptValue('admin')),
    roles: [
      roleId
    ]
  }

  const { _id: userId } = await UserModel.create(initUser)

  const initUserInfo = {
    userId,
    nickname: '乾巧',
    avatar: '',
    phone: '555',
    email: 'faiz@faizadmin.com',
  }

  await UserInfoModel.create(initUserInfo)

  db.close()
})()
