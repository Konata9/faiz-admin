import global, { GlobalStore } from './global'
import rootStore, { RootStore } from './root'
import userStore, { UserStore } from './user'
import roleStore, { RoleStore } from './role'

export { GlobalStore } from './global'
export { RootStore } from './root'
export { UserStore } from './user'
export { RoleStore } from './role'

export interface IStore {
  global: GlobalStore
  rootStore: RootStore
  userStore: UserStore
  roleStore: RoleStore
}

const store: IStore = {
  global,
  rootStore,
  userStore,
  roleStore
}

export default store