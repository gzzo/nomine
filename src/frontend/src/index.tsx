import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client'

import { client } from 'utils/apollo'
import {
  store,
  persistor,
  history,
  persistedReducers,
  sagaMiddleware,
} from 'utils/store'

import App from './app'
import { rootSaga } from './reducers'

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
    store.replaceReducer(persistedReducers)
  })
}

render()
