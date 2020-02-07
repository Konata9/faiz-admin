import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { IStore, IRootStore } from '../store'

import Layout from './layout'
import Login from './login/index'

interface IProps {
  rootStore?: IRootStore
}

const App = inject((stores: IStore) => {
  return {
    rootStore: stores.rootStore
  }
})(
  observer(
    ({ rootStore }: IProps) => {
      const { languageInited, currentLanguage } = rootStore || {}
      console.log('currentLanguage', currentLanguage)

      if (!languageInited) {
        return (
          <div>Loading...</div>
        )
      }

      return (
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/" component={Layout} exact />
        </Switch>
      )
    }
  )
)

export default hot(App)