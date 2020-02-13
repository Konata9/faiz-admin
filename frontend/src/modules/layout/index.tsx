import React from 'react'
import { StyledLayout } from '@modules/style/layout'
import { SideBar, Container } from './style'

import Menu from './menu'
import Header from './header'
import Content from './content'

const Layout = ({ routes }: any) => {
  return (
    <StyledLayout>
      <SideBar>
        <Menu />
      </SideBar>

      <Container>
        <Header />
        <Content routes={routes} />
      </Container>
    </StyledLayout>
  )
}

export default Layout