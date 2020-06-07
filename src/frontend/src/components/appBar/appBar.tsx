import React from 'react'
import classNames from 'classnames'
import {
  AppBar as MaterialAppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from '@material-ui/icons'

import { DRAWER_WIDTH } from 'consts/style'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}))

type AppBarProps = {
  handleDrawerOpen: () => void
  isOpen: boolean
  title: string
}

export default function AppBar(props: AppBarProps): React.ReactElement {
  const classes = useStyles()
  const { isOpen, handleDrawerOpen, title } = props

  return (
    <MaterialAppBar
      position="absolute"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: isOpen,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, {
            [classes.hide]: isOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </MaterialAppBar>
  )
}
