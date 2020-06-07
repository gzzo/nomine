import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import { all } from 'redux-saga/effects'
import { History } from 'history'

import { reducer as page } from './page'

// eslint-disable-next-line @typescript-eslint/no-empty-function
function* sampleRootSaga() {}

export function* rootSaga(): Generator {
  yield all([sampleRootSaga()])
}

const rootReducers = combineReducers({
  page,
})

export const reducers = (history: History): Reducer =>
  combineReducers({
    ...rootReducers,
    router: connectRouter(history),
  })

type RouterReducerType = {
  router: Reducer
}

export type RootState = ReturnType<typeof rootReducers & RouterReducerType>
