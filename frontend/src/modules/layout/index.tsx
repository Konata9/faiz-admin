import React from 'react'
import { StyledLayout } from '@modules/style/layout'
import { SideBar, Container } from './style'

import { IRouter } from '@modules/routes'

import Menu from './menu'
import Header from './header'
import Content from './content'

interface IProps {
  routes: IRouter[]
}

const Layout = ({ routes }: IProps) => {
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