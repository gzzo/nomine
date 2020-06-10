import React from 'react'
import {
  Box,
  Divider,
  Typography,
  Container,
  IconButton,
} from '@material-ui/core'
import { Link, RouteChildrenProps } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'

import { Page } from 'components/page'
import { DASHBOARD_PAGE } from 'consts/pages'
import { GetNamerQuery } from 'consts/types'
import { FoldersTable } from 'components/foldersTable'

export const GET_NAMER = gql`
  query GetNamer($id: Int!) {
    namer_by_pk(id: $id) {
      id
      name
      type
      folders {
        id
        folder
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  header: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
  },
}))

function PageHeader() {
  const classes = useStyles()

  return (
    <Box>
      <Box className={classes.header}>
        <Container>
          <Box display="flex" alignItems="center">
            <Box mr={1}>
              <IconButton component={Link} to={DASHBOARD_PAGE.path}>
                <ArrowBack />
              </IconButton>
            </Box>
            <Typography>Dashboard</Typography>
          </Box>
        </Container>
      </Box>
      <Divider />
    </Box>
  )
}

export default function Namer(
  props: RouteChildrenProps<{ namer_id: string }>
): React.ReactElement {
  const { namer_id } = props.match.params
  const { loading, error, data } = useQuery<GetNamerQuery>(GET_NAMER, {
    variables: { id: parseInt(namer_id) },
  })

  if (loading || error) {
    return null
  }

  const { name, folders } = data.namer_by_pk

  return (
    <Page title={`Namer: ${name}`} header={<PageHeader />}>
      <Container>
        <FoldersTable folders={folders} />
      </Container>
    </Page>
  )
}
