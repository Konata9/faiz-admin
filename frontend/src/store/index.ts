import rootStore, { RootStore } from './root'
import userStore, { UserStore } from './user'

export { RootStore } from './root'
export { UserStore } from './user'

export interface IStore {
  rootStore: RootStore
  userStore: UserStore
}

const store: IStore = {
  rootStore,
  userStore
}

export default store