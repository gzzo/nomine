import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MenuOpen } from '@material-ui/icons'

import { DRAWER_WIDTH } from 'consts/style'
import { DRAWER_MAIN_PAGES } from 'consts/pages'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}))

type MainDrawerProps = {
  handleDrawerClose: () => void
  isOpen: boolean
}

export default function MainDrawer(props: MainDrawerProps): React.ReactElement {
  const classes = useStyles()
  const { handleDrawerClose, isOpen } = props

  return (
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <MenuOpen />
        </IconButton>
      </div>
      <Divider />
      <List>
        {DRAWER_MAIN_PAGES.map(({ path, title, Icon }) => (
          <ListItem
            key={path}
            component={Link}
            to={{ pathname: path }}
            button
            selected={location.pathname === path}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
