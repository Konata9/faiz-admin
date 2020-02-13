import React from 'react'
import { ContentWrapper } from './style'
import RenderRoutes from '@modules/renderRoutes'

import { IRouter } from '@modules/routes'

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