import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from './layout'
import Login from './login/index'

const { useState, useEffect } = React

const App = () => {

  const [intlInited, setIntlInit] = useState(false)

  const loadLocales = async function () {
    setIntlInit(true)
  }

  useEffect(() => {
    loadLocales()
  }, [])

  if (!intlInited) {
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

export default hot(App)