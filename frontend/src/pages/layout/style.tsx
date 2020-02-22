import styled from 'styled-components'
import { Link, LinkProps } from 'react-router-dom'
import { bgDark, bgWhite, fontDark, fontBlue, fontGray, borderLight } from '@src/pages/style/color'

interface IBreadLink extends LinkProps {
  current: any
}

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
  border-bottom: 1px solid ${borderLight};
  display: flex;
  justify-content: flex-end;
`

export const UserInfoWrapper = styled.div`
  min-width: 100px;
  height: ${headerHeight};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const UserNameWrapper = styled.div`
  margin-left: 10px;
`

export const BreadcrumbWrapper = styled.div`
  padding: 10px 20px;
  color: ${fontDark};
  background: ${bgWhite};
`

export const BreadLink = styled(Link)`
  color: ${
  ({ current = 0 }: IBreadLink) => current ? fontBlue : fontGray
  }
`

export const BreadSpliter = styled.span`
  padding: 0 10px;
`

export const ContentWrapper = styled.div`
width: 100 %;
padding: 20px;
color: ${ fontDark};
`