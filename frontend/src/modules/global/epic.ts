import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap, tap, map, startWith, catchError, delay, mapTo } from 'rxjs/operators'
import { actions } from './action'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const getUser = gql`
  query{
    Users{
      username
    }
  }
`

const login: Epic = (action$) =>
  action$.pipe(
    ofType(actions.login.LOGIN),
    delay(1000),
    map(() => {
      const res = useQuery(getUser)
      console.log(res)
    })
  )

export default [
  login
]