import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import { all } from 'redux-saga/effects'
import { History } from 'history'

const sampleReducer = (state = {}) => state

// eslint-disable-next-line @typescript-eslint/no-empty-function
function* sampleRootSaga() {}

export function* rootSaga(): Generator {
  yield all([sampleRootSaga()])
}

export const reducers = (history: History): Reducer =>
  combineReducers({
    sampleReducer,
    router: connectRouter(history),
  })
