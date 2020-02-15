import React from 'react'
import { Dropdown, Menu, Avatar, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import Breadcrumb from './breadcrumb'

import { formatMessage } from '@utils'
import { IStore, IUserStore } from '@store'
import { HeaderWrapper, UserInfoWrapper, UserNameWrapper } from './style'
import { RouterLink } from '@modules/style/layout'

interface IProps {
  userStore?: IUserStore
}

const iconStyle = {
  marginRight: '15px'
}

const Header = inject((stores: IStore): IProps => {
  return {
    userStore: stores.userStore
  }
})(
  observer(
    ({ userStore }: IProps) => {
      const { userInfo, logout } = userStore as IUserStore

      const dropdownMenu = (
        <Menu>
          <Menu.Item>
            <RouterLink to="/account">
              <Icon type="user" style={iconStyle} />
              {formatMessage('account_center')}
            </RouterLink>
          </Menu.Item>
          <Menu.Item onClick={logout}>
            <Icon type="logout" style={iconStyle} />
            {formatMessage('system.logout')}
          </Menu.Item>
        </Menu>
      )

      return (
        <>
          <HeaderWrapper>
            <Dropdown overlay={dropdownMenu} placement="bottomRight">
              <UserInfoWrapper>
                <Avatar icon="user" />
                <UserNameWrapper>233</UserNameWrapper>
              </UserInfoWrapper>
            </Dropdown>
          </HeaderWrapper>
          <Breadcrumb />
        </>
      )
    }
  )
)

export default Header