import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

import { Drawer } from 'components/drawer'
import { AppBar } from 'components/appBar'

import { openDrawer, closeDrawer } from 'reducers/page'
import { RootState } from 'reducers'

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

type PageProps = ReduxProps & {
  children: JSX.Element
  title: string
}

function Page({
  children,
  title,
  openDrawer,
  closeDrawer,
  drawerIsOpen,
}: PageProps): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar
        handleDrawerOpen={openDrawer}
        isOpen={drawerIsOpen}
        title={title}
      />
      <Drawer handleDrawerClose={closeDrawer} isOpen={drawerIsOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">{children}</Container>
      </main>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    drawerIsOpen: state.page.drawer.isOpen,
  }
}

const mapDispatchToProps = {
  openDrawer: () => openDrawer(),
  closeDrawer: () => closeDrawer(),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ReduxProps = ConnectedProps<typeof connector>

export default Page
