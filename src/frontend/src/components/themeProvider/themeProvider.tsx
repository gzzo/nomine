import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useMediaQuery } from '@material-ui/core'
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
  ThemeProviderProps as MaterialThemeProviderProps,
} from '@material-ui/core/styles'

import { RootState } from 'reducers'

type ThemeProviderProps = ReduxProps & MaterialThemeProviderProps

function ThemeProvider({
  children,
  isDarkMode,
}: ThemeProviderProps): React.ReactElement {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const useDarkMode =
    isDarkMode === true || (isDarkMode === null && prefersDarkMode)

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: useDarkMode ? 'dark' : 'light',
        },
      }),
    [useDarkMode]
  )

  return <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
}

const mapStateToProps = (state: RootState) => {
  return {
    isDarkMode: state.page.isDarkMode,
  }
}

const connector = connect(mapStateToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ThemeProvider)
