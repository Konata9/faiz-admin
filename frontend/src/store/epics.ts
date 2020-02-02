import { combineEpics } from 'redux-observable'

import loginEpics from '../modules/global/epic'

const epics = combineEpics(
  ...loginEpics,
)

export default epics