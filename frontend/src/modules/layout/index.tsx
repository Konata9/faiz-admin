import React from 'react'
import { StyledLayout, ContentWrapper } from '../style/layout'

import Menu from './menu'
import Header from './header'
import Content from './content'

const Layout = () => {
  return (
    <StyledLayout>
      <Menu />
      <div>
        <Header />
        <ContentWrapper>
          <Content />
        </ContentWrapper>
      </div>
    </StyledLayout>
  )
}

export default Layout