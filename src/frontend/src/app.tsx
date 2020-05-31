import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Helmet } from 'react-helmet'
import { ConnectedRouter } from 'connected-react-router'

import Home from 'pages/home'

import { AppProps } from './app.d'

import 'sanitize.css'

class App extends React.Component<AppProps> {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Helmet>
            <title>Hello</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
}

export default hot(App)
