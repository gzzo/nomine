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

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
}

export default function AppBar(props: AppBarProps): JSX.Element {
  const classes = useStyles()
  const { isOpen, handleDrawerOpen } = props

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
          Dashboard
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
