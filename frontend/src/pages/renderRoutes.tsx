import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { IRouter } from '@src/pages/routes'

const RenderRoutes = ({ routes }: { routes: Array<IRouter> }) => {
  return (
    <Switch>
      {
        routes.map((router: any, index) => {
          const { path, component: RouterComponent, redirect, routes, exact = false } = router

          if (redirect) {
            return <Redirect
              key={index}
              from={path}
              to={redirect}
              exact={exact}
            />
          }

          return (
            <Route
              key={index}
              path={path}
              exact={exact}
              render={(props) => <RouterComponent {...props} routes={routes} />}
            />
          )
        })
      }
    </Switch>
  )
}

export default RenderRoutes