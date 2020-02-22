import React from 'react'
import { LogoWrapper } from './style'
import { fontLight } from '@modules/style/color'
import { RouterLink } from '@modules/style/layout'

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