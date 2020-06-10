import React from 'react'
import { Grid } from '@material-ui/core'

import { Page } from 'components/page'

import DarkModeSwitch from './darkModeSwitch'

export default function Settings(): React.ReactElement {
  return (
    <Page title="Settings">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DarkModeSwitch />
        </Grid>
      </Grid>
    </Page>
  )
}
