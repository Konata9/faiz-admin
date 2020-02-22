import React from 'react'
import { inject, observer } from 'mobx-react'
import { Menu } from 'antd'
import { RouterLink } from '@src/pages/style/layout'
import { MenuWrapper } from './style'
import Logo from './logo'

import { IStore, RootStore } from '@store'
import { formatMessage } from '@utils'

interface IProps {
  rootStore?: RootStore
}

const MenuList = inject((stores: IStore): IProps => {
  return {
    rootStore: stores.rootStore
  }
})(
  observer(
    ({ rootStore }: IProps) => {

      const { openKeys, activeMenu, setOpenMenus, setActiveMenu, menuList } = rootStore as RootStore

      const changeOpenMenu = (openKeys: string[]) => {
        setOpenMenus(openKeys)
      }

      const selectMenu = ({ key: menuKey, keyPath, selectedKeys }: any) => {
        setActiveMenu(menuKey)
      }

      const createMenuList = (menuList: Array<any>): any => {
        return menuList.map((menu) => {
          const { submenu, name, link = '' } = menu
          if (submenu && submenu.length > 0) {
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