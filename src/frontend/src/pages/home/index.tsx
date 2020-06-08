import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  CardHeader,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Fab,
  Divider,
  Box,
} from '@material-ui/core'
import { MoreVert, Add } from '@material-ui/icons'
import { gql, useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'

import { AddNamerDialog } from 'components/addNamer'
import { Page } from 'components/page'
import { NamerType } from 'consts/types'
import { Dispatch } from 'redux'
import { setModal } from 'reducers/modal'
import { ADD_NAMER_DIALOG } from 'consts/modals'

const GET_NAMERS = gql`
  query GetNamers {
    namer {
      id
      name
    }
  }
`

type GetNamersData = {
  namer: NamerType[]
}

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
})

function Dashboard({ openAddNamerDialog }: ReduxProps): React.ReactElement {
  const classes = useStyles()
  const { loading, error, data } = useQuery<GetNamersData>(GET_NAMERS)

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
          <Grid item xs={12} md={4} key={namerObject.id}>
            <Card elevation={1}>
              <CardHeader
                title="word"
                action={
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography>{namerObject.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openAddNamerDialog: () =>
      dispatch(setModal({ modalId: ADD_NAMER_DIALOG, isOpen: true })),
  }
}

const connector = connect(null, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Dashboard)
