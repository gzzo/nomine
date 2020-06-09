import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Helmet } from 'react-helmet'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { CssBaseline, useMediaQuery } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import { ThemeProvider } from 'components/themeProvider'
import { ALL_PAGES } from 'consts/pages'

type AppProps = {
  history: History
}

function App({ history }: AppProps): React.ReactElement {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  )

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet>
          <title>Hello</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          {ALL_PAGES.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} />
          ))}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </ThemeProvider>
    </ConnectedRouter>
  )
}

export default hot(App)
