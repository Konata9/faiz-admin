import React from 'react'
import { Switch, Route } from 'react-router-dom'

const RenderRoutes = ({ routes }: { routes: Array<any> }) => {
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