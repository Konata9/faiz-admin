import Login from '@src/pages/login'
import Layout from '@src/pages/layout'
import Dashboard from '@src/pages/dashboard'
import User from '@src/pages/system/user'
import Role from '@src/pages/system/role'
import Account from '@src/pages/account'

export interface IRouter {
  path: string
  component?: JSX.Element | React.ReactNode
  redirect?: string
  exact?: boolean
  meta?: any
  routes?: IRouter[]
}

const routes: Array<IRouter> = [
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/',
    component: Layout,
    routes: [
      { path: '/', redirect: '/dashboard', exact: true },
      { path: '/dashboard', component: Dashboard },
      { path: '/system', redirect: '/system/user', exact: true },
      { path: '/system/user', component: User },
      { path: '/system/role', component: Role },
      { path: '/account', component: Account },
    ]
  },
]


export default routes