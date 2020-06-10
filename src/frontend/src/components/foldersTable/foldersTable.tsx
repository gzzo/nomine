import React from 'react'

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Checkbox,
  TableCell,
} from '@material-ui/core'

import { GetNamerQuery } from 'consts/types'
import { AddFolderDialog } from 'components/addFolder'

import TableToolbar from './tableToolbar'

const HEAD_CELLS = [{ name: 'Folder' }, { name: 'Method' }]

type FoldersTableProps = {
  folders: GetNamerQuery['namer_by_pk']['folders']
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
              <TableRow hover key={folderObj.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{folderObj.folder}</TableCell>
                <TableCell>{folderObj.method}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}