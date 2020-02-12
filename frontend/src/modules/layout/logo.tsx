import React from 'react'
import { LogoWrapper } from './style'
import { RouterLink } from '@modules/style/layout'

const Logo = () => {
  return (
    <LogoWrapper>
      <RouterLink to="/">
        Faiz Admin
      </RouterLink>
    </LogoWrapper>
  )
}

export default Logo