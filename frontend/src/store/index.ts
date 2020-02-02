import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import reducers from './reducers'
import epics from './epics'

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const epicMiddleware = createEpicMiddleware()

const configureStore = () => {
  const middleware = [epicMiddleware]
  const enhancer = composeEnhancers(applyMiddleware(...middleware))
  return createStore(reducers, enhancer)
}

const store = configureStore()
epicMiddleware.run(epics)

export default store