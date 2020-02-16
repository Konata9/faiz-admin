import 'module-alias/register'
import Database from './database'
import schemas from '@src/graphql/schema'
import { encryptValue, encryptValeUseSHA } from '@utils'

(async function () {
  const db = new Database()
  const { UsersModel, UserInfosModel, RolesModel, MenuModel } = schemas

  await db.init()

  const initMenu = [
    {
      name: 'dashboard',
      link: '/',
      submenu: []
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

  const { _id: roleId } = await RolesModel.create(initRole)

  const initUser = {
    username: 'admin',
    password: encryptValeUseSHA(encryptValue('admin')),
    roles: [
      roleId
    ]
  }

  const { _id: userId } = await UsersModel.create(initUser)

  const initUserInfo = {
    userId,
    nickname: '乾巧',
    avatar: '',
    phone: '555',
    email: 'faiz@faizadmin.com',
    extra: {
      rider: true
    }
  }

  await UserInfosModel.create(initUserInfo)

  db.close()
})()
