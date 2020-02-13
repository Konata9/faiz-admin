import React from 'react'
import { ContentWrapper } from './style'
import RenderRoutes from '@modules/renderRoutes'

const Content = ({ routes }: any) => {

  return (
    <ContentWrapper>
      <RenderRoutes routes={routes} />
    </ContentWrapper>
  )
}

export default Content