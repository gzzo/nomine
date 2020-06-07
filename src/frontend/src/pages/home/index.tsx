import React from 'react'
import { Box, Typography, Grid, Card, CardContent } from '@material-ui/core'

import { Page } from 'components/page'

export default function Dashboard(): JSX.Element {
  return (
    <Page title="Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography>test</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Typography>word</Typography>
      </Box>
    </Page>
  )
}
