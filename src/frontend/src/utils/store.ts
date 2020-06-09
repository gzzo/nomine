import storage from 'redux-persist/lib/storage'
import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'

import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'

import { createBrowserHistory } from 'history'

import createSagaMiddleware from 'redux-saga'

import { reducers } from 'reducers'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const persistConfig = { key: 'root', storage, whitelist: ['page'] }
const persistedReducers = persistReducer(persistConfig, reducers(history))

const store = createStore(
  persistedReducers,
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
)
const persistor = persistStore(store)

export { history, store, persistor, persistedReducers, sagaMiddleware }
