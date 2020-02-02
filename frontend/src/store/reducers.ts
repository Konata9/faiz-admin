import { combineReducers } from 'redux'

import { loginReducer } from '../modules/global/reducer'

const reducers = combineReducers({ login: loginReducer })

export default reducers