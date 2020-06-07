import React from 'react'
import { useMediaQuery, Switch, FormControlLabel } from '@material-ui/core'

import { connect, ConnectedProps } from 'react-redux'

import { Dispatch } from 'redux'

import { RootState } from 'reducers'
import { setDarkMode } from 'reducers/page'

function DarkModeSwitch({
  isDarkMode,
  toggleDarkMode,
}: ReduxProps): React.ReactElement {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const useDarkMode =
    isDarkMode === true || (isDarkMode === null && prefersDarkMode)

  // console.log(prefersDarkMode, isDarkMode, prefersDarkMode)
  return (
    <FormControlLabel
      control={<Switch checked={useDarkMode} onChange={toggleDarkMode} />}
      label="Dark Mode"
    />
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isDarkMode: state.page.isDarkMode,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleDarkMode: (isDarkMode: boolean) => () =>
      dispatch(setDarkMode(isDarkMode)),
  }
}

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>
) => {
  return {
    isDarkMode: stateProps.isDarkMode,
    toggleDarkMode: dispatchProps.toggleDarkMode(!stateProps.isDarkMode),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(DarkModeSwitch)
