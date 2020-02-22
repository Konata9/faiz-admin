import React from 'react'
import { ContentWrapper } from './style'
import RenderRoutes from '@src/pages/renderRoutes'

import { IRouter } from '@src/pages/routes'

interface IProps {
  routes: IRouter[]
}

const Content = ({ routes }: IProps) => {

  return (
    <ContentWrapper>
      <RenderRoutes routes={routes} />
    </ContentWrapper>
  )
}

export default Content