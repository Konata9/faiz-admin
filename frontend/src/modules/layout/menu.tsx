import React from 'react'
import { inject, observer } from 'mobx-react'
import { Menu } from 'antd'
import { RouterLink } from '@modules/style/layout'
import { MenuWrapper } from './style'
import Logo from './logo'

import { IStore, IRootStore } from '@store'
import { formatMessage } from '@utils'

const menuList = [
  {
    name: 'dashboard',
    link: '/'
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

interface IProps {
  rootStore?: IRootStore
}

const MenuList = inject((stores: IStore): IProps => {
  return {
    rootStore: stores.rootStore
  }
})(
  observer(
    ({ rootStore }: IProps) => {

      const { openKeys, activeMenu, setOpenMenus, setActiveMenu } = rootStore as IRootStore

      const changeOpenMenu = (openKeys: string[]) => {
        console.log(openKeys)
        setOpenMenus(openKeys)
      }

      const selectMenu = ({ key: menuKey, keyPath, selectedKeys }: any) => {
        setActiveMenu(menuKey)
      }

      const createMenuList = (menuList: Array<any>): any => {
        return menuList.map((menu) => {
          const { submenu, name, link = '' } = menu
          if (submenu) {
            return (
              <Menu.SubMenu title={formatMessage(`menu.${name}`)} key={link} >
                {...createMenuList(submenu)}
              </Menu.SubMenu>
            )
          } else {
            return (
              <Menu.Item key={link}>
                <RouterLink to={link}>{formatMessage(`menu.${name}`)}</RouterLink>
              </Menu.Item>
            )
          }
        })
      }

      return (
        <MenuWrapper>
          <Logo />
          <Menu
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={[activeMenu]}
            onOpenChange={changeOpenMenu}
            onSelect={selectMenu}>
            {...createMenuList(menuList)}
          </Menu>
        </MenuWrapper>
      )
    }
  )
)

export default MenuList