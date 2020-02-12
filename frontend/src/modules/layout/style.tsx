import styled from 'styled-components'
import { bgDark, bgWhite, fontDark } from '@modules/style/color'

const headerHeight = '64px'

export const SideBar = styled.div`
  
`

export const Container = styled.div`
  flex: 1;
`

export const LogoWrapper = styled.div`
  width: 100%;
  height: ${headerHeight};
  line-height: ${headerHeight};
  font-size: 2rem;
  text-align: center;
`

export const MenuWrapper = styled.div`
  width: 256px;
  height: 100%;
  background: ${bgDark}
`

export const HeaderWrapper = styled.div`
  width: 100%;
  height: ${headerHeight};
  line-height: ${headerHeight};
  padding: 0 20px;
  color: ${fontDark};
  background: ${bgWhite};
  display: flex;
  justify-content: space-between;
`

export const ContentWrapper = styled.div`
  width: 100%;
  padding: 20px;
  color: ${fontDark};
`