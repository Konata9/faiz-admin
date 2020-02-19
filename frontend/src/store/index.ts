import global, { GlobalStore } from './global'
import rootStore, { RootStore } from './root'
import userStore, { UserStore } from './user'

export { GlobalStore } from './global'
export { RootStore } from './root'
export { UserStore } from './user'

export interface IStore {
  global: GlobalStore
  rootStore: RootStore
  userStore: UserStore
}

const store: IStore = {
  global,
  rootStore,
  userStore
}

export default store