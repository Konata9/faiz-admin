import React from 'react'
import { LogoWrapper } from './style'
import { fontLight } from '@src/pages/style/color'
import { RouterLink } from '@src/pages/style/layout'

const Logo = () => {
  return (
    <LogoWrapper>
      <RouterLink to="/" color={fontLight}>
        Faiz Admin
      </RouterLink>
    </LogoWrapper>
  )
}

export default Logo