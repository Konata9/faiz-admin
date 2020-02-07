import { observable } from 'mobx'

class RootStore {

  @observable
  isLogin: false

}

export default new RootStore()