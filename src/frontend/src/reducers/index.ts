import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import { all } from 'redux-saga/effects'
import { History } from 'history'

import { reducer as page } from './page'
import { reducer as modal } from './modal'

// eslint-disable-next-line @typescript-eslint/no-empty-function
function* sampleRootSaga() {}

export function* rootSaga(): Generator {
  yield all([sampleRootSaga()])
}

export const reducers = (history: History): Reducer =>
  combineReducers({
    page,
    modal,
    router: connectRouter(history),
  })

export type RootState = ReturnType<ReturnType<typeof reducers>>
