import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'

import { reducers, rootSaga } from 'reducers'

import App from './app'

const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
)
sagaMiddleware.run(rootSaga)

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

const render = (): void => {
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App history={history} />
      </ApolloProvider>
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('app', render)
  module.hot.accept('reducers', () => {
    store.replaceReducer(reducers(history))
  })
}

render()
