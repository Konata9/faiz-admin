import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Spin } from 'antd'
import { inject, observer } from 'mobx-react'
import { IStore, RootStore } from '@store'
import { StyledLayout } from './style/layout'

import RenderRoutes from './renderRoutes'
import routes from './routes'

interface IProps {
  rootStore?: RootStore
}

const App = inject((stores: IStore) => {
  return {
    rootStore: stores.rootStore as RootStore
  }
})(
  observer(
    ({ rootStore }: IProps) => {
      const { languageInited } = rootStore || {}

      if (!languageInited) {
        return (
          <StyledLayout>
            <Spin spinning />
          </StyledLayout>
        )
      }

      return (
        <RenderRoutes routes={routes} />
      )
    }
  )
)

export default hot(App)