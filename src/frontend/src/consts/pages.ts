import _ from 'lodash'

import DashboardPage from 'pages/home'
import SettingsPage from 'pages/settings'
import NamerPage from 'pages/namer'

import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons'

export const DASHBOARD_PAGE = {
  Component: DashboardPage,
  Icon: DashboardIcon,
  path: '/dashboard',
  title: 'Dashboard',
}

export const SETTINGS_PAGE = {
  Component: SettingsPage,
  Icon: SettingsIcon,
  path: '/settings',
  title: 'Settings',
}

export const NAMER_PAGE = {
  Component: NamerPage,
  path: '/namer/:namer_id',
}

export const DRAWER_MAIN_PAGES = [DASHBOARD_PAGE, SETTINGS_PAGE]

export const ALL_PAGES = _.concat(DRAWER_MAIN_PAGES, [NAMER_PAGE])
