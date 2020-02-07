import rootStore, { IRootStore } from './root'

export { IRootStore } from './root'

export interface IStore {
  rootStore: IRootStore
}

const store: IStore = {
  rootStore
}

export default store