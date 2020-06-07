import DashboardPage from 'pages/home'
import SettingsPage from 'pages/settings'

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

export const MAIN_PAGES = [DASHBOARD_PAGE, SETTINGS_PAGE]
