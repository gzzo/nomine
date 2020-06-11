import React from 'react'
import _ from 'lodash'
import { gql, useQuery } from '@apollo/client'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Checkbox,
  Collapse,
  TableCell,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core'
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

import {
  GetNamerQuery,
  GetFoldersQuery,
  NamerEntriesSubscription,
  Namer_Watch_Folder,
} from 'consts/types'
import { AddFolderDialog } from 'components/addFolder'

import TableToolbar from './tableToolbar'

const ENTRIES_SUBSCRIPTION = gql`
  subscription NamerEntries($id: Int!) {
    namer_entries(id: $id) {
      id
      folder_id
      path
      type
    }
  }
`

const GET_FOLDERS = gql`
  query GetFolders($id: Int!) {
    folder_entry(where: { folder_id: { _eq: $id } }) {
      id
      folder_id
      path
      path
    }
  }
`

const HEAD_CELLS = [{ name: 'Folder' }, { name: 'Method' }]

type FoldersTableProps = {
  folders: GetNamerQuery['namer_by_pk']['folders']
}

type FolderRowProps = Pick<Namer_Watch_Folder, 'id' | 'folder' | 'method'>

function FolderRow({ id, folder, method }: FolderRowProps) {
  const [open, setOpen] = React.useState(false)
  const { data, subscribeToMore } = useQuery<GetFoldersQuery>(GET_FOLDERS, {
    variables: { id },
  })
  subscribeToMore<NamerEntriesSubscription>({
    document: ENTRIES_SUBSCRIPTION,
    variables: { id },
    updateQuery(prev, { subscriptionData }) {
      const prevById = _.keyBy(prev.folder_entry, 'id')
      const newEntry = subscriptionData.data.namer_entries
      if (newEntry.id in prevById) {
        prevById[newEntry.id] = {
          ...prevById[newEntry.id],
          ...newEntry,
        }

        return {
          folder_entry: prev.folder_entry.map(entry => prevById[entry.id]),
        }
      }

      return {
        folder_entry: prev.folder_entry.concat([newEntry]),
      }
    },
  })

  return (
    <>
      <TableRow hover>
        <TableCell padding="checkbox">
          <Checkbox />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{folder}</TableCell>
        <TableCell>{method}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {data &&
                data.folder_entry.map(entry => (
                  <Typography key={entry.id}>{entry.path}</Typography>
                ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function FoldersTable({
  folders,
}: FoldersTableProps): React.ReactElement {
  return (
    <Paper>
      <TableToolbar />
      <AddFolderDialog />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              {HEAD_CELLS.map(headCell => (
                <TableCell key={headCell.name}>{headCell.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {folders.map(folderObj => (
              <FolderRow key={folderObj.id} {...folderObj} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
