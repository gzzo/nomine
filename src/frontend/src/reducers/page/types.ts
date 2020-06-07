export const SET_DRAWER = 'page/SET_DRAWER'
export const SET_DARK_MODE = 'page/SET_DARK_MODE'

export type SetDrawerAction = {
  type: typeof SET_DRAWER
  isOpen: boolean
}

export type SetDarkModeAction = {
  type: typeof SET_DARK_MODE
  isDarkMode: boolean
}

export type PageActionTypes = SetDrawerAction | SetDarkModeAction

export type PageDrawerState = {
  isOpen: boolean
}

export type PageState = {
  drawer: PageDrawerState
  isDarkMode: boolean
}
