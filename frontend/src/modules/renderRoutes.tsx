import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { IRouter } from '@modules/routes'

const RenderRoutes = ({ routes }: { routes: Array<IRouter> }) => {
  return (
    <Switch>
      {
        routes.map((router: any, index) => {
          const { path, component: RouterComponent, routes } = router
          return (
            <Route key={index} path={path} render={(props) => <RouterComponent {...props} routes={routes} />} />
          )
        })
      }
    </Switch>
  )
}

export default RenderRoutes