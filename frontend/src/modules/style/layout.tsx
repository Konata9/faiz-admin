import styled from 'styled-components'
import { bgLight, fontLight } from './style'

export const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: ${fontLight};
  background: ${bgLight};
  display: flex;
`

export const LayoutLeftWrapper = styled.div`
  flex: 1;
`

export const LayoutRightWrapper = styled.div`
  flex: 1;
`
