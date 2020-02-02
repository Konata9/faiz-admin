import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap, tap, map, startWith, catchError, delay, mapTo } from 'rxjs/operators'
import { actions } from './action'

const login: Epic = (action$) =>
  action$.pipe(
    ofType(actions.login.LOGIN),
    delay(1000),
  )

export default [
  login
]