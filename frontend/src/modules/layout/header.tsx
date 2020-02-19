import React from 'react'
import { Dropdown, Menu, Avatar, Icon, Spin } from 'antd'
import { inject, observer } from 'mobx-react'
import Breadcrumb from './breadcrumb'

import { formatMessage } from '@utils'
import { IStore, UserStore, GlobalStore } from '@store'
import { HeaderWrapper, UserInfoWrapper, UserNameWrapper } from './style'
import { RouterLink } from '@modules/style/layout'

interface IProps {
  global?: GlobalStore
  userStore?: UserStore
}

const iconStyle = {
  marginRight: '15px'
}

const Header = inject((stores: IStore): IProps => {
  return {
    global: stores.global as GlobalStore,
    userStore: stores.userStore as UserStore
  }
})(
  observer(
    ({ global, userStore }: IProps) => {
      const { userInfo: { nickname, avatar }, logout } = userStore as UserStore
      const { loadingStatus } = global as GlobalStore

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
              <Spin spinning={loadingStatus['getUserInfo']}>
                <UserInfoWrapper>
                  <Avatar icon="user" src={avatar} />
                  <UserNameWrapper>{nickname}</UserNameWrapper>
                </UserInfoWrapper>
              </Spin>
            </Dropdown>
          </HeaderWrapper>
          <Breadcrumb />
        </>
      )
    }
  )
)

export default Header