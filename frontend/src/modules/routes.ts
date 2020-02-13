import Login from '@modules/login'
import Layout from '@modules/layout'
import Dashboard from '@modules/dashboard'
import User from '@modules/system/user'
import Role from '@modules/system/role'

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
    component: Login
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
    ]
  },
]


export default routes