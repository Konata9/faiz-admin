import Login from '@modules/login'
import Layout from '@modules/layout'
import Dashboard from '@modules/dashboard'
import User from '@modules/system/user'
import Role from '@modules/system/role'

export interface IRouter {
  path: string
  component: JSX.Element | React.ReactNode
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
      { path: '/dashboard', component: Dashboard },
      { path: '/system/user', component: User },
      { path: '/system/role', component: Role }
    ]
  },
]


export default routes