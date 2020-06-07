import React from 'react'
import { useSubscription, gql, useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Container, Grid, Card } from '@material-ui/core'

import { Drawer } from 'components/drawer'
import { AppBar } from 'components/appBar'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default function Dashboard(): JSX.Element {
  const classes = useStyles()
  const [isOpen, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <AppBar handleDrawerOpen={handleDrawerOpen} isOpen={isOpen} />
      <Drawer handleDrawerClose={handleDrawerClose} isOpen={isOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <Typography>test</Typography>
              </Card>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Typography>word</Typography>
          </Box>
        </Container>
      </main>
    </div>
  )
}
