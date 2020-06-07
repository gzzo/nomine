import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

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
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

type PageProps = {
  children: JSX.Element
  title: string
}

export default function Page({ children, title }: PageProps): JSX.Element {
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
      <AppBar
        handleDrawerOpen={handleDrawerOpen}
        isOpen={isOpen}
        title={title}
      />
      <Drawer handleDrawerClose={handleDrawerClose} isOpen={isOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">{children}</Container>
      </main>
    </div>
  )
}
