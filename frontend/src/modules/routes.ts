import Login from '@modules/login'
import Layout from '@modules/layout'
import Dashboard from '@modules/dashboard'
import User from '@modules/system/user'
import Role from '@modules/system/role'

const routes = [
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