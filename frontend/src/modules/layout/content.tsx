import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ContentWrapper } from './style'

import Dashboard from '@modules/dashboard'
import User from '@modules/system/user'
import Role from '@modules/system/role'

const Content = () => {

  return (
    <ContentWrapper>
      <Switch>
        <Route path="/system/user" component={User} exact></Route>
        <Route path="/system/role" component={Role} exact></Route>
        <Route path="/" component={Dashboard} exact></Route>
      </Switch>
    </ContentWrapper>
  )
}

export default Content