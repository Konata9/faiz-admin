import React from 'react'
import { Dropdown, Menu, Avatar, Icon } from 'antd'
import { HeaderWrapper } from './style'
import { RouterLink } from '@modules/style/layout'
import Breadcrumb from './breadcrumb'

const dropdownMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
)

const Header = () => {
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

export default Header