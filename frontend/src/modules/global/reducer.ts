import { actions } from './action'

interface IglobalInitState {
  logining: boolean
  userInfo: {
    username: string | null,
  }
}

const globalInitState: IglobalInitState = {
  logining: false,
  userInfo: {
    username: null
  }
}

export const loginReducer = (state: IglobalInitState = globalInitState, action: any) => {
  switch (action.type) {
    case actions.login.LOGINING:
      return { ...state, logining: true }
    case actions.login.LOGINED:
    case actions.login.LOGIN_FAILED:
      return { ...state, logining: false }
    case actions.logout.LOGOUT:
      return { ...state, logining: false }
    default:
      return state
  }
}