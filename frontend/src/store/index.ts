import rootStore, { IRootStore } from './root'
import userStore, { IUserStore } from './user'

export { IRootStore } from './root'
export { IUserStore } from './user'

export interface IStore {
  rootStore: IRootStore
  userStore: IUserStore
}

const store: IStore = {
  rootStore,
  userStore
}

export default store