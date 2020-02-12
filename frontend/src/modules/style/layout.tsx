import styled from 'styled-components'
import { bgLight, fontLight } from './color'
import { Link } from 'react-router-dom'

export const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: ${fontLight};
  background: ${bgLight};
  display: flex;
`

export const RouterLink = styled(Link)`
  color: ${fontLight};

  &:hover{
    color: ${fontLight}
  }
`