import { action } from 'typesafe-actions'

export const actions = {
  login: {
    LOGIN: 'LOGIN',
    LOGINING: 'LOGINING',
    LOGINED: 'LOGINED',
    LOGIN_FAILED: 'LOGIN_FAILED',
  },
  logout: {
    LOGOUT: 'LOGOUT'
  }
}

export const login = (username: string, password: string) => action(actions.login.LOGIN, { username, password })
export const logining = () => action(actions.login.LOGINING)
export const logined = () => action(actions.login.LOGINED)
export const loginFailed = () => action(actions.login.LOGIN_FAILED)

export const logout = () => action(actions.logout.LOGOUT)