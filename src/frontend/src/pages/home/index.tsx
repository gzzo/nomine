import React from 'react'
import {
  CardHeader,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Fab,
  Button,
  Divider,
  Box,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { MoreVert, Add } from '@material-ui/icons'
import { gql, useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'

import { AddNamerDialog } from 'components/addNamer'
import { Page } from 'components/page'
import { GetNamersQuery, Namer } from 'consts/types'
import { useModal } from 'components/modal'
import { ADD_NAMER_DIALOG } from 'consts/modals'
import { NAMER_PAGE } from 'consts/pages'
import { withParams } from 'utils/router'

export const GET_NAMERS = gql`
  query GetNamers {
    namer {
      id
      name
      type
    }
  }
`

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  more: {
    marginLeft: 'auto',
  },
})

function NamerCard({ id, name, type }: Namer) {
  const classes = useStyles()
  return (
    <Card elevation={1}>
      <CardHeader
        title={name}
        subheader={type}
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
      />
      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.more}
          size="small"
          color="primary"
          component={Link}
          to={withParams(NAMER_PAGE.path, { namer_id: id })}
        >
          More
        </Button>
      </CardActions>
    </Card>
  )
}

function Dashboard(): React.ReactElement {
  const classes = useStyles()
  const { loading, error, data } = useQuery<GetNamersQuery>(GET_NAMERS)
  const { openModal: openAddNamerDialog } = useModal(ADD_NAMER_DIALOG)

  if (loading || error) {
    return null
  }

  const { namer } = data

  return (
    <Page title="Dashboard">
      <AddNamerDialog />
      <Box display="flex" alignItems="center">
        <Typography variant="h4" className={classes.title}>
          Namers
        </Typography>
        <Fab onClick={openAddNamerDialog}>
          <Add />
        </Fab>
      </Box>
      <Box my={3}>
        <Divider />
      </Box>
      <Grid container spacing={8}>
        {namer.map(namerObject => (
          <Grid item xs={12} md={6} key={namerObject.id}>
            <NamerCard {...namerObject} />
          </Grid>
        ))}
      </Grid>
    </Page>
  )
}

export default Dashboard
