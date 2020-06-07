import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Helmet } from 'react-helmet'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import CssBaseline from '@material-ui/core/CssBaseline'

import { MAIN_PAGES } from 'consts/pages'

type AppProps = {
  history: History
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <CssBaseline />
          <Helmet>
            <title>Hello</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
          </Helmet>
          <Switch>
            {MAIN_PAGES.map(({ path, Component }) => (
              <Route key={path} path={path} component={Component} />
            ))}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
}

export default hot(App)
