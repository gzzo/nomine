import React from 'react'
import { Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

import { Drawer } from 'components/drawer'
import { AppBar } from 'components/appBar'

import { setDrawer } from 'reducers/page'
import { RootState } from 'reducers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

type PageProps = ReduxProps & {
  children: React.ReactNode
  header?: React.ReactNode
  title: string
}

function Page({
  children,
  title,
  header,
  openDrawer,
  closeDrawer,
  drawerIsOpen,
}: PageProps): React.ReactElement {
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
        <div className={classes.appBarSpacer} />
        {header}
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    drawerIsOpen: state.page.drawer.isOpen,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openDrawer: () => dispatch(setDrawer(true)),
    closeDrawer: () => dispatch(setDrawer(false)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Page)
