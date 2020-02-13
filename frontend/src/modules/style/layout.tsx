import styled from 'styled-components'
import { bgLight, fontLight, fontDark } from './color'
import { Link, LinkProps } from 'react-router-dom'

interface IRouterLink extends LinkProps {
  color?: string
}

export const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: ${fontLight};
  background: ${bgLight};
  display: flex;
`

export const RouterLink = styled(Link)`
  color: ${
  ({ color = fontDark }: IRouterLink) => color
  };

  &:hover{
    color: ${
  ({ color = fontDark }: IRouterLink) => color
  };
  }
`