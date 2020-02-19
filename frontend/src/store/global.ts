import { observable, action } from 'mobx'

export class GlobalStore {
  @observable
  loadingStatus: { [key: string]: boolean } = {}

  @action.bound
  switchLoadingStatus(key: string, status: boolean = false) {
    this.loadingStatus = {
      ...this.loadingStatus,
      [key]: status
    }
  }
}

const global = new GlobalStore()
export default global