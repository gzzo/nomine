import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import { PersistGate } from 'redux-persist/integration/react'
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'

import { reducers, rootSaga } from 'reducers'

import App from './app'

const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const persistConfig = { key: 'root', storage, whitelist: ['page'] }
const store = createStore(
  persistReducer(persistConfig, reducers(history)),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
)
const persistor = persistStore(store)

const httpLink = new HttpLink({
  uri: '/graphql/',
})

const wsLink = new WebSocketLink({
  uri: `ws://127.0.0.1:5000/graphql/`,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  // See https://github.com/apollographql/apollo-client/issues/6333
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

sagaMiddleware.run(rootSaga)

const render = (): void => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <App history={history} />
        </ApolloProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('app', render)
  module.hot.accept('reducers', () => {
    store.replaceReducer(persistReducer(persistConfig, reducers(history)))
  })
}

render()
