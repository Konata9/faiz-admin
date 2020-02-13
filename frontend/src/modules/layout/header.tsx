import React from 'react'
import { Dropdown, Menu, Avatar, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import Breadcrumb from './breadcrumb'

import { formatMessage } from '@utils'
import { IStore, IUserStore } from '@store'
import { HeaderWrapper } from './style'
import { RouterLink } from '@modules/style/layout'

interface IProps {
  userStore?: IUserStore
}

const iconStyle = {
  marginRight: '15px'
}

const dropdownMenu = (
  <Menu>
    <Menu.Item>
      <RouterLink to="/">
        <Icon type="user" style={iconStyle} />
        {formatMessage('account_center')}
      </RouterLink>
    </Menu.Item>
    <Menu.Item>
      <RouterLink to="/">
        <Icon type="logout" style={iconStyle} />
        {formatMessage('system.logout')}
      </RouterLink>
    </Menu.Item>
  </Menu>
)

const Header = inject((stores: IStore) => {
  return {
    userStore: stores.userStore
  }
})(
  observer(
    ({ userStore }: IProps) => {
      const { userInfo } = userStore || { userInfo: {} }

      return (
        <>
          <HeaderWrapper>
            <Dropdown overlay={dropdownMenu} placement="bottomRight">
              <div>
                <Avatar icon="user" />233
              </div>
            </Dropdown>
          </HeaderWrapper>
          <Breadcrumb />
        </>
      )
    }
  )
)

export default Header