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

export function watchLoading(): any {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): any {
    let response: any = null
    const tragetValue = descriptor.value
    descriptor.value = async function (...args: any[]) {
      global.switchLoadingStatus(propertyKey, true)
      try {
        response = await tragetValue.apply(this, args)
      } catch (error) {
        console.log(error)
      }
      global.switchLoadingStatus(propertyKey, false)
      return response
    }
    return descriptor
  }
}

export default global