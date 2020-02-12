import React from 'react'
import { inject, observer } from 'mobx-react'
import { Menu } from 'antd'
import { MenuWrapper } from './style'
import Logo from './logo'

import { IStore, IRootStore } from '@store'

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
      return (
        <MenuWrapper>
          <Logo />
          <Menu theme="dark">
            <Menu.SubMenu>

            </Menu.SubMenu>
          </Menu>
        </MenuWrapper>
      )
    }
  )
)

export default MenuList