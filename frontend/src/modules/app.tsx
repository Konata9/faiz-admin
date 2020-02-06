import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from './layout'
import Login from './login/index'

const App = () => {

  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/" component={Layout} exact />
    </Switch>
  )
}

export default hot(App)