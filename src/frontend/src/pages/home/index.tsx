import React from 'react'
import {
  CardHeader,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

import { Page } from 'components/page'

const tiles = [
  {
    title: 'hello',
  },
  {
    title: 'test',
  },
  {
    title: 'word',
  },
  {
    title: 'foobar',
  },
]

export default function Dashboard(): React.ReactElement {
  return (
    <Page title="Dashboard">
      <Grid container spacing={8}>
        {tiles.map(tile => (
          <Grid item xs={12} md={6} key={tile.title}>
            <Card key={tile.title} elevation={1}>
              <CardHeader
                title="word"
                action={
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography>{tile.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  )
}
