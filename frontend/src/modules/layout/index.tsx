import React from 'react'
import { StyledLayout } from '../style/layout'

import Menu from './menu'
import Header from './header'
import Content from './content'

const Layout = () => {
  return (
    <StyledLayout>
      <Menu />
      <Header />
      <Content />
    </StyledLayout>
  )
}

export default Layout