import React from 'react'
import { Dropdown, Menu, Avatar } from 'antd'
import { HeaderWrapper } from './style'
import Breadcrumbs from './breadcrumbs'

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
    <HeaderWrapper>
      <Breadcrumbs />
      <div>
        <Dropdown overlay={dropdownMenu} placement="bottomLeft">
          <div>
            <Avatar icon="user" />233
          </div>
        </Dropdown>
      </div>
    </HeaderWrapper>
  )
}

export default Header