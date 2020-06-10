import React from 'react'
import {
  Box,
  Divider,
  Typography,
  Container,
  IconButton,
  Toolbar,
  Paper,
} from '@material-ui/core'
import { Link, RouteChildrenProps } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'

import { Page } from 'components/page'
import { DASHBOARD_PAGE } from 'consts/pages'
import { GetNamerQuery, Namer as NamerType } from 'consts/types'
import { FoldersTable as InputFoldersTable } from 'components/foldersTable'

export const GET_NAMER = gql`
  query GetNamer($id: Int!) {
    namer_by_pk(id: $id) {
      id
      name
      type
      to_dir
      folders {
        id
        folder
        method
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  header: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
  },
  paper: {
    paddingBottom: theme.spacing(2),
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

type OutputFolderPaperProps = {
  to_dir: NamerType['to_dir']
}

function OutputFolderPaper({
  to_dir,
}: OutputFolderPaperProps): React.ReactElement {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Toolbar>
        <Typography variant="h6">Output Folder</Typography>
      </Toolbar>
      <Container>
        <Typography>{to_dir}</Typography>
      </Container>
    </Paper>
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

  const { name, folders, to_dir } = data.namer_by_pk

  return (
    <Page title={`Namer: ${name}`} header={<PageHeader />}>
      <Container>
        <InputFoldersTable folders={folders} />
        <Box my={4}>
          <OutputFolderPaper to_dir={to_dir} />
        </Box>
      </Container>
    </Page>
  )
}
