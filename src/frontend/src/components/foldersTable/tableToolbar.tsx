import React from 'react'
import { IconButton, Toolbar, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { useModal } from 'components/modal'
import { ADD_FOLDER_DIALOG } from 'consts/modals'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
})

export default function TableToolbar(): React.ReactElement {
  const classes = useStyles()
  const { openModal } = useModal(ADD_FOLDER_DIALOG)

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" component="div">
        Input Folders
      </Typography>
      <IconButton onClick={openModal}>
        <Add />
      </IconButton>
    </Toolbar>
  )
}
