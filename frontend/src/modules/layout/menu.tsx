import React from 'react'
import { inject, observer } from 'mobx-react'
import { Menu } from 'antd'
import { RouterLink } from '@modules/style/layout'
import { MenuWrapper } from './style'
import Logo from './logo'

import { IStore, IRootStore } from '@store'

const menuList = [
  {
    name: 'dashboard',
    link: '/'
  },
  {
    name: 'system',
    submenu: [
      {
        name: 'user',
        link: '/user'
      },
      {
        name: 'role',
        link: '/role'
      }
    ]
  }
]

interface IProps {
  rootStore?: IRootStore
}

const MenuList = inject((stores: IStore) => {
  return {
    rootStore: stores.rootStore
  }
})(
  observer(
    (props: IProps) => {
      const createMenuList = (menuList: Array<any>): any => {
        return menuList.map(menu => {
          const { submenu = [], name, link = '' } = menu
          if (submenu.length > 0) {
            return (
              <Menu.SubMenu title={name} >
                {...createMenuList(submenu)}
              </Menu.SubMenu>
            )
          } else {
            return (
              <Menu.Item>
                <RouterLink to={link}>{name}</RouterLink>
              </Menu.Item>
            )
          }
        })
      }

      return (
        <MenuWrapper>
          <Logo />
          <Menu theme="dark" mode="inline">
            {...createMenuList(menuList)}
          </Menu>
        </MenuWrapper>
      )
    }
  )
)

export default MenuList